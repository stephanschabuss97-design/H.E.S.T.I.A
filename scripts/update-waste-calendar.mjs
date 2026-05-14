import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

const REQUEST_TIMEOUT_MS = 20000;
const OUTPUT_PATH = "assets/data/waste-calendar.axams.json";
const MIN_FUTURE_DAYS = 30;
const WARN_FUTURE_DAYS = 60;
const ALLOWED_ARGS = new Set(["--help", "--check-discovery", "--print-json", "--write-json"]);

export const COLLECTIONS = Object.freeze([
  {
    id: "bio-west",
    label: "Biomuell",
    area: "westlich Axamer Bach",
    hint: "Ab 7:00 bereitstellen",
    pageUrl: "https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13",
    fallbackIcalUrl:
      "https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2Nzcz&gnr=297&sprache=1",
  },
  {
    id: "rest-axams-dorf",
    label: "Restmuell",
    area: "Axams Dorf",
    hint: "Ab 7:00 bereitstellen",
    pageUrl: "https://www.axams.gv.at/Restmuell_Axams_Dorf",
    fallbackIcalUrl:
      "https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2ODUw&gnr=297&sprache=1",
  },
  {
    id: "gelber-sack-axams-dorf",
    label: "Gelber Sack",
    area: "Axams Dorf",
    hint: "Ab 7:00 bereitstellen",
    pageUrl: "https://www.axams.gv.at/Gelber_Sack_-_Axams_Dorf",
    fallbackIcalUrl:
      "https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2ODU2&gnr=297&sprache=1",
  },
]);

export function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&quot;", '"')
    .replaceAll("&#34;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

export function decodeHtmlText(value) {
  return decodeHtmlAttribute(value).replace(/&#x([0-9a-f]+);/gi, (_match, code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  ).replace(/&#([0-9]+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}

export function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function unfoldIcalLines(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n[ \t]/g, "");
}

function extractEventBlocks(unfoldedText) {
  return [...unfoldedText.matchAll(/BEGIN:VEVENT\n([\s\S]*?)\nEND:VEVENT/g)].map((match) => match[1]);
}

function removeAlarmBlocks(eventBlock) {
  return eventBlock.replace(/BEGIN:VALARM\n[\s\S]*?\nEND:VALARM/g, "").trim();
}

function parsePropertyLine(line) {
  const separatorIndex = line.indexOf(":");
  if (separatorIndex === -1) {
    return null;
  }

  const nameAndParams = line.slice(0, separatorIndex);
  const value = line.slice(separatorIndex + 1);
  const [name, ...params] = nameAndParams.split(";");
  return {
    name: name.toUpperCase(),
    params,
    value,
  };
}

function parseProperties(eventBlock) {
  const properties = new Map();
  const lines = removeAlarmBlocks(eventBlock).split("\n");

  for (const line of lines) {
    const property = parsePropertyLine(line);
    if (!property) {
      continue;
    }

    if (!properties.has(property.name)) {
      properties.set(property.name, property);
    }
  }

  return properties;
}

function decodeIcalText(value) {
  return decodeHtmlText(value)
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .replace(/\s+/g, " ")
    .trim();
}

function isAllDayDateProperty(property) {
  return property.params.some((param) => param.toUpperCase() === "VALUE=DATE");
}

function parseIcalDate(property, fieldName) {
  if (!isAllDayDateProperty(property)) {
    throw new Error(`${fieldName} must use VALUE=DATE.`);
  }

  const { value } = property;
  if (!/^\d{8}$/.test(value)) {
    throw new Error(`${fieldName} must be an all-day iCal date in YYYYMMDD format.`);
  }

  const normalized = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  const parsed = new Date(`${normalized}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getUTCFullYear() !== Number.parseInt(value.slice(0, 4), 10) ||
    parsed.getUTCMonth() + 1 !== Number.parseInt(value.slice(4, 6), 10) ||
    parsed.getUTCDate() !== Number.parseInt(value.slice(6, 8), 10)
  ) {
    throw new Error(`${fieldName} is not a valid calendar date.`);
  }

  return normalized;
}

function requireProperty(properties, name) {
  const property = properties.get(name);
  if (!property || property.value.trim() === "") {
    throw new Error(`VEVENT is missing required field ${name}.`);
  }
  return property;
}

export function parseIcalEvents(icalText) {
  const unfoldedText = unfoldIcalLines(icalText);
  const eventBlocks = extractEventBlocks(unfoldedText);

  if (eventBlocks.length === 0) {
    throw new Error("iCal feed contains no VEVENT blocks.");
  }

  return eventBlocks.map((eventBlock) => {
    const properties = parseProperties(eventBlock);
    const dtstart = requireProperty(properties, "DTSTART");
    const dtend = properties.get("DTEND");
    const summary = requireProperty(properties, "SUMMARY");
    const uid = requireProperty(properties, "UID");
    const description = properties.get("DESCRIPTION");

    return {
      date: parseIcalDate(dtstart, "DTSTART"),
      endDate: dtend ? parseIcalDate(dtend, "DTEND") : null,
      title: decodeIcalText(summary.value),
      sourceUid: uid.value.trim(),
      description: description ? decodeIcalText(description.value) : "",
    };
  });
}

function sortDateEntries(entries) {
  return [...entries].sort((left, right) => {
    const dateOrder = left.date.localeCompare(right.date);
    if (dateOrder !== 0) {
      return dateOrder;
    }

    const titleOrder = left.title.localeCompare(right.title);
    if (titleOrder !== 0) {
      return titleOrder;
    }

    return left.sourceUid.localeCompare(right.sourceUid);
  });
}

function toDateEntry(event) {
  return {
    date: event.date,
    title: event.title,
    sourceUid: event.sourceUid,
  };
}

function parseIsoDateToUtcMs(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid ISO date: ${date}.`);
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`Invalid ISO date: ${date}.`);
  }

  return parsed.getTime();
}

function normalizeRunDate(runDate) {
  if (typeof runDate === "string") {
    parseIsoDateToUtcMs(runDate);
    return runDate;
  }

  if (runDate instanceof Date && !Number.isNaN(runDate.getTime())) {
    return runDate.toISOString().slice(0, 10);
  }

  throw new Error("Run date must be an ISO date string or a valid Date.");
}

function addDays(date, days) {
  const timestamp = parseIsoDateToUtcMs(date) + days * 24 * 60 * 60 * 1000;
  return new Date(timestamp).toISOString().slice(0, 10);
}

function diffDays(leftDate, rightDate) {
  return Math.floor((parseIsoDateToUtcMs(leftDate) - parseIsoDateToUtcMs(rightDate)) / (24 * 60 * 60 * 1000));
}

function validateEndDate(collectionId, event) {
  if (!event.endDate) {
    throw new Error(`Collection ${collectionId} event ${event.sourceUid} is missing DTEND.`);
  }

  const expectedEndDate = addDays(event.date, 1);
  if (event.endDate !== expectedEndDate) {
    throw new Error(
      `Collection ${collectionId} event ${event.sourceUid} has DTEND ${event.endDate}, expected ${expectedEndDate}.`,
    );
  }
}

function validateAndDedupeEvents(collectionId, events, runDate) {
  if (events.length === 0) {
    throw new Error(`Collection ${collectionId} has no events.`);
  }

  const byUid = new Map();
  const byDateTitle = new Map();
  const deduped = [];

  for (const event of events) {
    validateEndDate(collectionId, event);

    const uid = event.sourceUid.trim();
    if (!uid) {
      throw new Error(`Collection ${collectionId} contains an event without UID.`);
    }

    const dateTitleKey = `${event.date}\u0000${event.title}`;
    const existingByUid = byUid.get(uid);
    if (existingByUid) {
      if (existingByUid.date !== event.date || existingByUid.title !== event.title) {
        throw new Error(`Collection ${collectionId} has UID ${uid} with conflicting date or title.`);
      }
      continue;
    }

    const existingUidForDateTitle = byDateTitle.get(dateTitleKey);
    if (existingUidForDateTitle && existingUidForDateTitle !== uid) {
      throw new Error(
        `Collection ${collectionId} has duplicate date/title ${event.date} ${event.title} with different UIDs.`,
      );
    }

    byUid.set(uid, event);
    byDateTitle.set(dateTitleKey, uid);
    deduped.push({
      ...event,
      sourceUid: uid,
    });
  }

  const sortedEvents = sortDateEntries(deduped);
  const futureEvents = sortedEvents.filter((event) => event.date > runDate);
  if (futureEvents.length === 0) {
    throw new Error(`Collection ${collectionId} has no future events after ${runDate}.`);
  }

  const lastFutureEvent = futureEvents.at(-1);
  const futureDays = diffDays(lastFutureEvent.date, runDate);
  if (futureDays < MIN_FUTURE_DAYS) {
    throw new Error(
      `Collection ${collectionId} future window is ${futureDays} days; expected at least ${MIN_FUTURE_DAYS}.`,
    );
  }

  const warnings = [];
  if (futureDays < WARN_FUTURE_DAYS) {
    warnings.push(
      `Collection ${collectionId} future window is ${futureDays} days; below ${WARN_FUTURE_DAYS}.`,
    );
  }

  return {
    events: sortedEvents,
    warnings,
  };
}

export function buildWasteCalendarReport(sourceResults, collections = COLLECTIONS, options = {}) {
  const collectionIds = new Set(collections.map((collection) => collection.id));
  const resultByCollectionId = new Map();
  for (const result of sourceResults) {
    if (!collectionIds.has(result.collectionId)) {
      throw new Error(`Unexpected source result for ${result.collectionId}.`);
    }
    if (resultByCollectionId.has(result.collectionId)) {
      throw new Error(`Duplicate source result for ${result.collectionId}.`);
    }
    resultByCollectionId.set(result.collectionId, result);
  }

  const runDate = normalizeRunDate(options.runDate ?? new Date());
  const warnings = [];

  const parsedCollections = collections.map((collection) => {
    const result = resultByCollectionId.get(collection.id);
    if (!result) {
      throw new Error(`Missing source result for ${collection.id}.`);
    }

    const validation = validateAndDedupeEvents(collection.id, parseIcalEvents(result.feedText), runDate);
    warnings.push(...validation.warnings);

    return {
      collection,
      result,
      events: validation.events,
    };
  });

  const calendar = {
    schemaVersion: 1,
    municipality: "Axams",
    area: "Axams Dorf; Biomuell westlich Axamer Bach",
    source: {
      type: "axams-ical",
      pages: parsedCollections.map(({ collection, result }) => {
        return {
          collectionId: collection.id,
          pageUrl: collection.pageUrl,
          icalUrl: result.icalUrl,
        };
      }),
    },
    collections: parsedCollections.map(({ collection, events }) => {
      return {
        id: collection.id,
        label: collection.label,
        area: collection.area,
        hint: collection.hint,
        dates: sortDateEntries(events.map(toDateEntry)),
      };
    }),
  };

  return {
    calendar,
    warnings,
  };
}

export function buildWasteCalendarJson(sourceResults, collections = COLLECTIONS, options = {}) {
  return buildWasteCalendarReport(sourceResults, collections, options).calendar;
}

export function serializeWasteCalendarJson(calendar) {
  return `${JSON.stringify(calendar, null, 2)}\n`;
}

async function writeTextFile(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

export function extractIcalUrlFromHtml(html, pageUrl) {
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  const candidates = anchors
    .map((match) => {
      const attrs = match[1];
      const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      if (!hrefMatch) {
        return null;
      }

      const href = decodeHtmlAttribute(hrefMatch[1] ?? hrefMatch[2] ?? hrefMatch[3]);
      const text = stripTags(match[2]);
      return {
        href,
        text,
        isCalendarService: href.includes("CalendarService.ashx"),
        isIcalText: /ical/i.test(text),
      };
    })
    .filter(Boolean)
    .filter((candidate) => candidate.isCalendarService || candidate.isIcalText);

  const candidate =
    candidates.find((item) => item.isCalendarService && item.isIcalText) ??
    candidates.find((item) => item.isCalendarService) ??
    candidates.find((item) => item.isIcalText);

  if (!candidate) {
    throw new Error("No iCal download link found on source page.");
  }

  return new URL(candidate.href, pageUrl).href;
}

export async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "HESTIA waste calendar updater",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: HTTP ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  return {
    status: response.status,
    text,
  };
}

export async function discoverCollectionSource(collection) {
  let discoveredUrl = null;
  let pageStatus = null;
  let warning = null;

  try {
    const page = await fetchText(collection.pageUrl);
    pageStatus = page.status;
    discoveredUrl = extractIcalUrlFromHtml(page.text, collection.pageUrl);
  } catch (error) {
    warning = `Using fallback iCal URL for ${collection.id}: ${error.message}`;
    discoveredUrl = collection.fallbackIcalUrl;
  }

  const feed = await fetchText(discoveredUrl);
  if (!feed.text.includes("BEGIN:VCALENDAR")) {
    throw new Error(`Discovered iCal feed for ${collection.id} is not a VCALENDAR.`);
  }

  return {
    collectionId: collection.id,
    pageUrl: collection.pageUrl,
    pageStatus,
    icalUrl: discoveredUrl,
    icalStatus: feed.status,
    usedFallback: discoveredUrl === collection.fallbackIcalUrl && warning !== null,
    warning,
    feedText: feed.text,
  };
}

export async function discoverAllSources(collections = COLLECTIONS) {
  const results = [];
  for (const collection of collections) {
    results.push(await discoverCollectionSource(collection));
  }
  return results;
}

function summarizeDiscovery(result) {
  return [
    result.collectionId,
    `page=${result.pageStatus ?? "fallback"}`,
    `ical=${result.icalStatus}`,
    `fallback=${result.usedFallback ? "yes" : "no"}`,
    result.icalUrl,
  ].join(" | ");
}

async function runCli() {
  const args = process.argv.slice(2);
  const unknownArgs = args.filter((arg) => arg.startsWith("--") && !ALLOWED_ARGS.has(arg));
  if (unknownArgs.length > 0) {
    throw new Error(`Unknown argument: ${unknownArgs.join(", ")}`);
  }

  if (process.argv.includes("--help")) {
    console.log("Usage: node scripts/update-waste-calendar.mjs [--check-discovery] [--print-json] [--write-json]");
    return;
  }

  const results = await discoverAllSources();
  if (process.argv.includes("--print-json") || process.argv.includes("--write-json")) {
    for (const result of results) {
      if (result.warning) {
        console.warn(`[waste] ${result.warning}`);
      }
    }

    const report = buildWasteCalendarReport(results);
    const json = serializeWasteCalendarJson(report.calendar);
    for (const warning of report.warnings) {
      console.warn(`[waste] ${warning}`);
    }

    if (process.argv.includes("--print-json")) {
      process.stdout.write(json);
    }

    if (process.argv.includes("--write-json")) {
      await writeTextFile(OUTPUT_PATH, json);
      const logWrite = process.argv.includes("--print-json") ? console.error : console.log;
      logWrite(`[waste] wrote ${OUTPUT_PATH}`);
    }

    return;
  }

  for (const result of results) {
    if (result.warning) {
      console.warn(`[waste] ${result.warning}`);
    }
    console.log(`[waste] ${summarizeDiscovery(result)}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error) => {
    console.error(`[waste] ${error.message}`);
    process.exitCode = 1;
  });
}
