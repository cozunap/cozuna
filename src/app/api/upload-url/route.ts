import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    // 1. Verify Cloudflare config exists
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: 'Cloudflare credentials not configured' },
        { status: 500 }
      );
    }

    // 2. We can add basic auth header checking here if needed
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 3. Request Direct Upload URL from Cloudflare
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error('Cloudflare API Error:', data.errors);
      return NextResponse.json(
        { error: 'Failed to generate upload URL', details: data.errors },
        { status: 500 }
      );
    }

    // Return the upload URL and image ID to the client
    return NextResponse.json({
      success: true,
      id: data.result.id,
      uploadURL: data.result.uploadURL,
    });
  } catch (error) {
    console.error('Upload URL Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
