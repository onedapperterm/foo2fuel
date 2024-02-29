import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Item {
  id: number
  description: string
  category: string
  date: string
}

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'description',
    header: () => h('div', 'Description'),
    cell: ({ row }) => h('div', row.getValue('description'))
  },
  {
    accessorKey: 'category',
    header: () => h('div', 'Category'),
    cell: ({ row }) => h('div', row.getValue('category'))
  },
  {
    accessorKey: 'date',
    header: () => h('div', 'Date'),
    cell: ({ row }) => h('div', row.getValue('date'))
  }
]

