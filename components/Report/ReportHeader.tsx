'use client';
import { db } from '@/config/firestore';
import type { Notification } from '@/types/Notification';
import { Report } from '@/types/Report';
import { User } from '@/types/User';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

export default function ReportHeader({ report }: { report: Report }) {
  return (
    <div className="start flex">
      <div>
        <p className="text-xl font-extrabold">DM moderation required</p>
        <p className="text-xs">
          {report.reportTime?.toDate().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
