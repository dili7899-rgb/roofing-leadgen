import crypto from "node:crypto"

export interface ConsentEvent {
  eventId: string
  submittedAtUtc: string
  disclosureVersion: string
  disclosureHtmlSha256: string
  sellerList: Array<{ legalName: string; privacyUrl: string }>
  phone: string
  email?: string
  ip: string
  userAgent: string
  timezone: string
  pageUrl: string
  checkboxChecked: boolean
}

export function generateDisclosureHash(
  disclosureVersion: string,
  sellerNames: string[],
  plainTextDisclosure: string,
  phoneE164: string,
  pageUrl: string
): string {
  const canonicalString = [
    disclosureVersion,
    sellerNames.join("|"),
    plainTextDisclosure.replace(/\s+/g, " ").trim(),
    phoneE164,
    pageUrl
  ].join("\n")

  return crypto.createHash("sha256").update(canonicalString, "utf8").digest("hex")
}