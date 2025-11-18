import { ArrowLeft, Mail, Phone, Calendar, Badge as BadgeIcon, Activity, FileText, CreditCard, Check, X, Pencil, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Customer {
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

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

export function CustomerDetail({ customer, onBack }: CustomerDetailProps) {
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

  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);
  const [activeTab, setActiveTab] = useState('profile');

  // Mock check-in data
  const checkIns = [
    {
      id: '1',
      dateTime: '2024-11-18T09:30:00',
      className: 'Morning Yoga Flow'
    },
    {
      id: '2',
      dateTime: '2024-11-16T18:00:00',
      className: 'HIIT Training'
    },
    {
      id: '3',
      dateTime: '2024-11-15T10:00:00',
      className: 'Pilates Core'
    },
    {
      id: '4',
      dateTime: '2024-11-13T17:30:00',
      className: 'Spin Class'
    },
    {
      id: '5',
      dateTime: '2024-11-11T09:30:00',
      className: 'Morning Yoga Flow'
    },
    {
      id: '6',
      dateTime: '2024-11-09T18:00:00',
      className: 'HIIT Training'
    },
    {
      id: '7',
      dateTime: '2024-11-08T19:00:00',
      className: 'Zumba Dance'
    },
    {
      id: '8',
      dateTime: '2024-11-06T10:00:00',
      className: 'Pilates Core'
    },
    {
      id: '9',
      dateTime: '2024-11-04T09:30:00',
      className: 'Morning Yoga Flow'
    },
    {
      id: '10',
      dateTime: '2024-11-02T17:30:00',
      className: 'Spin Class'
    }
  ];

  // Mock household members data (only shown for family membership)
  const householdMembers = customer.membershipType === 'family' ? [
    {
      id: 'hm-1',
      name: 'John Johnson',
      email: 'john.j@techcorp.com',
      phone: '+1 (555) 123-4568',
      status: 'active' as const,
      role: 'Spouse'
    },
    {
      id: 'hm-2',
      name: 'Emma Johnson',
      email: 'emma.j@techcorp.com',
      phone: '+1 (555) 123-4569',
      status: 'active' as const,
      role: 'Child'
    },
    {
      id: 'hm-3',
      name: 'Oliver Johnson',
      email: 'oliver.j@techcorp.com',
      phone: '+1 (555) 123-4570',
      status: 'active' as const,
      role: 'Child'
    }
  ] : [];

  const handleEdit = () => {
    setIsEditing(true);
    setActiveTab('profile');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the editedCustomer data to the server
    console.log('Saved customer:', editedCustomer);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCustomer(customer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="mb-1 text-2xl font-medium">{customer.name}</h1>
          <p className="text-muted-foreground mb-2">{customer.email}</p>
          <Badge variant={getStatusVariant(customer.status)}>
            {customer.status}
          </Badge>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Email Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{customer.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{customer.value}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{customer.company}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="profile" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {customer.membershipType === 'family' && (
            <TabsTrigger value="household">Household</TabsTrigger>
          )}
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="space-y-6 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <div className="flex items-center gap-2 mt-1">
                      {isEditing ? (
                        <Input
                          name="name"
                          value={editedCustomer.name}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <span>{customer.name}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Email Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          name="email"
                          value={editedCustomer.email}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <span>{customer.email}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Phone Number</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          name="phone"
                          value={editedCustomer.phone}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <span>{customer.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <BadgeIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge variant={getStatusVariant(customer.status)}>
                        {customer.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Join Date</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(customer.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Customer ID</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-sm">{customer.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Check-In History</CardTitle>
              <CardDescription>Total Check-Ins: {checkIns.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Class Attended</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkIns.map((checkIn) => {
                      const date = new Date(checkIn.dateTime);
                      return (
                        <TableRow key={checkIn.id}>
                          <TableCell>
                            {date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            {date.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </TableCell>
                          <TableCell>{checkIn.className}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="household" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Household Members</CardTitle>
              <CardDescription>Family members associated with this account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {householdMembers.map((member) => {
                      return (
                        <TableRow key={member.id}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.phone}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(member.status)}>
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All orders placed by this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <div className="text-center space-y-2">
                  <FileText className="h-12 w-12 mx-auto opacity-20" />
                  <p>Order history coming soon</p>
                  <p className="text-sm">Total orders: {customer.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Payment methods and billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <div className="text-center space-y-2">
                  <CreditCard className="h-12 w-12 mx-auto opacity-20" />
                  <p>Billing information coming soon</p>
                  <p className="text-sm">Total value: {customer.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}