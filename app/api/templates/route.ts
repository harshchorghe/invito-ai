import { NextResponse } from 'next/server';
import { templates } from '@/templates';

export async function GET() {
  return NextResponse.json(templates);
}
