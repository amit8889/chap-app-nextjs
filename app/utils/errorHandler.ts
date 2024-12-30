import { NextRequest, NextResponse } from 'next/server';

export const errorHandler = (fn: (req: NextRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 500 }
      );
    }
  };
};
