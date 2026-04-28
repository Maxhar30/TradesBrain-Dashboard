"use client";

import { useState } from "react";
import { Plus, Search, Send, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatCurrency } from "@/lib/utils";
import { type Quote } from "@/types";

const MOCK_QUOTES: Quote[] = [
  {
    id: "q001",
    customerId: "c3",
    customerName: "Summit Retail Group",
    status: "sent",
    amount: 5220,
    tax: 580,
    total: 5800,
    validUntil: "2026-05-12T00:00:00Z",
    createdAt: "2026-04-26T10:00:00Z",
    lineItems: [],
    notes: "200A panel upgrade including permit and inspection.",
  },
  {
    id: "q002",
    customerId: "c12",
    customerName: "Pinecrest HOA",
    status: "draft",
    amount: 14400,
    tax: 1600,
    total: 16000,
    validUntil: "2026-05-15T00:00:00Z",
    createdAt: "2026-04-27T14:00:00Z",
    lineItems: [],
    notes: "Full repipe of 24-unit building.",
  },
  {
    id: "q003",
    customerId: "c13",
    customerName: "Dr. Kim's Dental",
    status: "accepted",
    amount: 2700,
    tax: 300,
    total: 3000,
    validUntil: "2026-05-01T00:00:00Z",
    createdAt: "2026-04-22T09:00:00Z",
    lineItems: [],
  },
  {
    id: "q004",
    customerId: "c14",
    customerName: "Blue Ridge Cafe",
    status: "declined",
    amount: 8100,
    tax: 900,
    total: 9000,
    validUntil: "2026-04-20T00:00:00Z",
    createdAt: "2026-04-10T11:00:00Z",
    lineItems: [],
    notes: "Commercial kitchen exhaust system replacement.",
  },
  {
    id: "q005",
    customerId: "c15",
    customerName: "Hillside Church",
    status: "sent",
    amount: 3600,
    tax: 400,
    total: 4000,
    validUntil: "2026-05-10T00:00:00Z",
    createdAt: "2026-04-25T13:00:00Z",
    lineItems: [],
    notes: "HVAC maintenance contract — annual.",
  },
];

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "declined", label: "Declined" },
];

const statusVariant: Record<string, string> = {
  draft: "secondary",
  sent: "scheduled",
  accepted: "success",
  declined: "destructive",
  expired: "secondary",
};

export default function QuotesPage() {
  const [search, setSearch] = useState("");

  function filtered(status: string) {
    return MOCK_QUOTES.filter((q) => {
      const matchStatus = status === "all" || q.status === status;
      const matchSearch =
        !search ||
        q.customerName.toLowerCase().includes(search.toLowerCase()) ||
        q.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  const pendingValue = MOCK_QUOTES.filter((q) => q.status === "sent").reduce(
    (sum, q) => sum + q.total,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">Quotes</h1>
          <p className="text-sm text-[#64748B]">
            {formatCurrency(pendingValue)} in pending quotes
          </p>
        </div>
        <Button className="sm:self-start">
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
        <Input
          placeholder="Search quotes..."
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
            <div className="space-y-3">
              {filtered(t.value).map((quote) => (
                <Card key={quote.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-[#0C2340]">
                            {quote.id}
                          </p>
                          <Badge variant={statusVariant[quote.status] as never}>
                            {quote.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#64748B] mt-0.5">
                          {quote.customerName}
                        </p>
                        {quote.notes && (
                          <p className="text-xs text-[#64748B] mt-1 line-clamp-1">
                            {quote.notes}
                          </p>
                        )}
                        <p className="text-xs text-[#64748B] mt-1">
                          Created {formatDate(quote.createdAt)} · Valid until{" "}
                          {formatDate(quote.validUntil)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#0C2340]">
                            {formatCurrency(quote.total)}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            incl. {formatCurrency(quote.tax)} tax
                          </p>
                        </div>
                        {quote.status === "draft" && (
                          <Button size="sm" variant="outline" className="gap-1.5">
                            <Send className="h-3.5 w-3.5" />
                            Send
                          </Button>
                        )}
                        {quote.status === "sent" && (
                          <div className="flex gap-1">
                            <Button size="sm" className="gap-1.5">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1.5">
                              <XCircle className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filtered(t.value).length === 0 && (
                <div className="text-center py-12 text-[#64748B]">
                  No quotes found.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
