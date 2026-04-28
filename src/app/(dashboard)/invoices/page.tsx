"use client";

import { useState } from "react";
import { Plus, Search, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatCurrency } from "@/lib/utils";
import { type Invoice } from "@/types";

const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv001",
    jobId: "j4",
    customerId: "c4",
    customerName: "Westgate Apartments",
    status: "paid",
    amount: 585,
    tax: 65,
    total: 650,
    issuedDate: "2026-04-28T10:15:00Z",
    dueDate: "2026-05-12T00:00:00Z",
    paidAt: "2026-04-28T11:00:00Z",
    lineItems: [],
  },
  {
    id: "inv002",
    jobId: "j1",
    customerId: "c1",
    customerName: "Riverside Office Park",
    status: "sent",
    amount: 2880,
    tax: 320,
    total: 3200,
    issuedDate: "2026-04-28T12:00:00Z",
    dueDate: "2026-05-12T00:00:00Z",
    lineItems: [],
  },
  {
    id: "inv003",
    jobId: "j5",
    customerId: "c5",
    customerName: "City Library District",
    status: "draft",
    amount: 990,
    tax: 110,
    total: 1100,
    issuedDate: "2026-04-27T09:00:00Z",
    dueDate: "2026-05-11T00:00:00Z",
    lineItems: [],
  },
  {
    id: "inv004",
    jobId: "j8",
    customerId: "c10",
    customerName: "Harborview Hotel",
    status: "overdue",
    amount: 7200,
    tax: 800,
    total: 8000,
    issuedDate: "2026-03-15T09:00:00Z",
    dueDate: "2026-03-30T00:00:00Z",
    lineItems: [],
  },
  {
    id: "inv005",
    jobId: "j9",
    customerId: "c11",
    customerName: "Green Valley School",
    status: "paid",
    amount: 1620,
    tax: 180,
    total: 1800,
    issuedDate: "2026-04-20T09:00:00Z",
    dueDate: "2026-05-04T00:00:00Z",
    paidAt: "2026-04-22T14:00:00Z",
    lineItems: [],
  },
];

const statusVariant: Record<string, string> = {
  draft: "secondary",
  sent: "scheduled",
  paid: "success",
  overdue: "destructive",
  cancelled: "secondary",
};

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const totalRevenue = MOCK_INVOICES.filter((i) => i.status === "paid").reduce(
    (sum, i) => sum + i.total,
    0
  );
  const outstanding = MOCK_INVOICES.filter(
    (i) => i.status === "sent" || i.status === "overdue"
  ).reduce((sum, i) => sum + i.total, 0);

  function filtered(status: string) {
    return MOCK_INVOICES.filter((inv) => {
      const matchStatus = status === "all" || inv.status === status;
      const matchSearch =
        !search ||
        inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
        inv.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">Invoices</h1>
          <p className="text-sm text-[#64748B]">
            {formatCurrency(totalRevenue)} collected ·{" "}
            <span className="text-[#D97706]">{formatCurrency(outstanding)} outstanding</span>
          </p>
        </div>
        <Button className="sm:self-start">
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
        <Input
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          {STATUS_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left p-4 font-medium text-[#64748B]">Invoice</th>
                      <th className="text-left p-4 font-medium text-[#64748B] hidden sm:table-cell">Customer</th>
                      <th className="text-left p-4 font-medium text-[#64748B] hidden md:table-cell">Issued</th>
                      <th className="text-left p-4 font-medium text-[#64748B] hidden lg:table-cell">Due</th>
                      <th className="text-left p-4 font-medium text-[#64748B]">Status</th>
                      <th className="text-right p-4 font-medium text-[#64748B]">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filtered(t.value).map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <p className="font-medium text-[#0C2340]">{inv.id}</p>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-[#64748B]">
                          {inv.customerName}
                        </td>
                        <td className="p-4 hidden md:table-cell text-[#64748B]">
                          {formatDate(inv.issuedDate)}
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span
                            className={
                              inv.status === "overdue"
                                ? "text-[#DC2626] font-medium"
                                : "text-[#64748B]"
                            }
                          >
                            {formatDate(inv.dueDate)}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge variant={statusVariant[inv.status] as never}>
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-semibold text-[#0C2340]">
                          {formatCurrency(inv.total)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 justify-end">
                            {inv.status === "draft" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="Send">
                                <Send className="h-3.5 w-3.5" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Download">
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered(t.value).length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-[#64748B]">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
