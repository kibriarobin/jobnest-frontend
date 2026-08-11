'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICategory } from '@/lib/type';

export function JobFilters({ categories }: { categories: ICategory[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') ?? '');

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('searchTerm', searchTerm);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Job title or keyword..."
            className="pl-9"
          />
        </div>
        <Button type="submit" disabled={isPending}>
          Search
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select
          defaultValue={searchParams.get('category') ?? 'all'}
          onValueChange={(v) => updateFilter('category', v)}
          disabled={isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          defaultValue={searchParams.get('location') ?? ''}
          onBlur={(e) => updateFilter('location', e.target.value)}
          placeholder="Location"
          disabled={isPending}
        />

        <Select
          defaultValue={searchParams.get('type') ?? 'all'}
          onValueChange={(v) => updateFilter('type', v)}
          disabled={isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="REMOTE">Remote</SelectItem>
            <SelectItem value="ONSITE">Onsite</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={searchParams.get('sort') ?? 'newest'}
          onValueChange={(v) => updateFilter('sort', v)}
          disabled={isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="salary-high">Salary: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}