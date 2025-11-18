import { useState } from 'react';
import { Search, MoreVertical, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Card, CardContent, CardHeader } from './ui/card';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  company: string;
  joinDate: string;
  totalOrders: number;
  value: string;
  membershipType?: 'family' | 'individual';
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    company: 'TechCorp Inc.',
    joinDate: '2024-01-15',
    totalOrders: 24,
    value: '$12,450',
    membershipType: 'family'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@innovate.io',
    phone: '+1 (555) 234-5678',
    status: 'active',
    company: 'Innovate Solutions',
    joinDate: '2024-02-20',
    totalOrders: 18,
    value: '$8,920',
    membershipType: 'individual'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@design.co',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    company: 'Design Co.',
    joinDate: '2024-11-10',
    totalOrders: 2,
    value: '$1,200',
    membershipType: 'individual'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'jwilson@globaltech.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    company: 'GlobalTech',
    joinDate: '2023-09-08',
    totalOrders: 45,
    value: '$28,340',
    membershipType: 'family'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa@startup.io',
    phone: '+1 (555) 567-8901',
    status: 'inactive',
    company: 'Startup Labs',
    joinDate: '2023-11-22',
    totalOrders: 12,
    value: '$5,600',
    membershipType: 'individual'
  },
  {
    id: '6',
    name: 'David Park',
    email: 'dpark@enterprises.com',
    phone: '+1 (555) 678-9012',
    status: 'active',
    company: 'Park Enterprises',
    joinDate: '2024-03-14',
    totalOrders: 32,
    value: '$19,780',
    membershipType: 'individual'
  },
  {
    id: '7',
    name: 'Jennifer Martinez',
    email: 'jmartinez@consulting.com',
    phone: '+1 (555) 789-0123',
    status: 'active',
    company: 'Martinez Consulting',
    joinDate: '2024-05-07',
    totalOrders: 15,
    value: '$11,250',
    membershipType: 'family'
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'rtaylor@solutions.net',
    phone: '+1 (555) 890-1234',
    status: 'pending',
    company: 'Taylor Solutions',
    joinDate: '2024-11-12',
    totalOrders: 1,
    value: '$450',
    membershipType: 'individual'
  },
  {
    id: '9',
    name: 'Amanda White',
    email: 'awhite@digital.io',
    phone: '+1 (555) 901-2345',
    status: 'active',
    company: 'Digital Dynamics',
    joinDate: '2024-06-18',
    totalOrders: 27,
    value: '$16,890',
    membershipType: 'individual'
  },
  {
    id: '10',
    name: 'Christopher Lee',
    email: 'clee@ventures.com',
    phone: '+1 (555) 012-3456',
    status: 'inactive',
    company: 'Lee Ventures',
    joinDate: '2023-08-30',
    totalOrders: 8,
    value: '$3,200',
    membershipType: 'individual'
  }
];

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerList({ onSelectCustomer }: CustomerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const getStatusVariant = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };

  const handleDeleteCustomer = () => {
    if (customerToDelete) {
      // Here you would typically send a delete request to the server
      console.log('Deleting customer:', customerToDelete);
      setCustomerToDelete(null);
    }
  };

  const filteredCustomers = mockCustomers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'value':
          return parseFloat(b.value.replace(/[$,]/g, '')) - parseFloat(a.value.replace(/[$,]/g, ''));
        default:
          return 0;
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="joinDate">Join Date</SelectItem>
                <SelectItem value="value">Total Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden xl:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Membership Type</TableHead>
                <TableHead className="hidden xl:table-cell">Join Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    className="cursor-pointer"
                    onClick={() => onSelectCustomer(customer)}
                  >
                    <TableCell>
                      <span className="font-medium">{customer.name}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {customer.email}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {customer.membershipType === 'family' ? 'Family' : 'Individual'}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {new Date(customer.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setCustomerToDelete(customer)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {filteredCustomers.length} of {mockCustomers.length} customers
          </div>
        </div>
      </CardContent>
      <AlertDialog open={customerToDelete !== null} onOpenChange={(open) => !open && setCustomerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer{customerToDelete ? ` "${customerToDelete.name}"` : ''} from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}