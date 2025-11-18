import { Users, TrendingUp, UserPlus, Activity, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CustomerList, Customer } from './CustomerList';
import { CustomerDetail } from './CustomerDetail';
import { AddCustomerModal } from './AddCustomerModal';
import { Button } from './ui/button';
import { useState } from 'react';

export function CustomersDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCustomer = (customerData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'active' | 'inactive' | 'pending';
  }) => {
    // In a real app, this would make an API call to create the customer
    console.log('New customer added:', customerData);
    // You could also add the customer to your local state/list here
  };

  const stats = [
    {
      title: 'Total Customers',
      value: '2,543',
      change: '+12% from last month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'New This Month',
      value: '324',
      change: '+8% from last month',
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: '1,892',
      change: '+5% from last month',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      title: 'Growth Rate',
      value: '24.5%',
      change: '+2.1% from last month',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  if (selectedCustomer) {
    return (
      <div className="space-y-6">
        <CustomerDetail 
          customer={selectedCustomer} 
          onBack={() => setSelectedCustomer(null)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-slate-900 mb-1">Customer List</h2>
          <p className="text-muted-foreground">
            Manage your customer database
          </p>
        </div>
        <Button className="sm:self-start" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <AddCustomerModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddCustomer={handleAddCustomer}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-slate-900 mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CustomerList onSelectCustomer={setSelectedCustomer} />
    </div>
  );
}