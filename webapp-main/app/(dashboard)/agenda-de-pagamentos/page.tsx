'use client';

import PendingAccounts from '@/components/agenda-de-pagamentos/pending-accounts';

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <PendingAccounts />
    </div>
  );
}
