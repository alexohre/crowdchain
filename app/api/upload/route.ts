import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Upload file to Pinata IPFS
    const { cid } = await pinata.upload.public.file(file);
    
    // Get the IPFS URL using gateway
    const ipfsUrl = await pinata.gateways.public.convert(cid);
    
    return NextResponse.json({ 
      success: true,
      cid: cid,
      ipfsUrl: ipfsUrl
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return NextResponse.json(
      { error: "Failed to upload file to IPFS" },
      { status: 500 }
    );
  }
}
