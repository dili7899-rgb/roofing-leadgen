export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

/**
 * Submits updated URLs directly to Bing and other IndexNow-supported search engines.
 * Accelerates indexing for active storm/roofing lead generation landing pages.
 */
export async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; status: number; message?: string }> {
  const host = process.env.NEXT_PUBLIC_BASE_URL 
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname 
    : 'usaroofdamagecheck.com';
    
  const apiKey = process.env.INDEXNOW_API_KEY;

  if (!apiKey) {
    console.warn('IndexNow execution skipped: Missing INDEXNOW_API_KEY in environment variables.');
    return { success: false, status: 400, message: 'Missing IndexNow API Key' };
  }

  if (!urls || urls.length === 0) {
    return { success: false, status: 400, message: 'URL list is empty' };
  }

  const payload: IndexNowPayload = {
    host: host,
    key: apiKey,
    keyLocation: `https://${host}/${apiKey}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      console.log(`✅ IndexNow successfully notified for ${urls.length} URL(s).`);
      return { success: true, status: response.status };
    } else {
      console.error(`❌ IndexNow submission failed with HTTP status ${response.status}`);
      return { success: false, status: response.status };
    }
  } catch (error: any) {
    console.error('Fatal IndexNow API Error:', error.message);
    return { success: false, status: 500, message: error.message };
  }
}