import { 
    IconDashboard, 
    IconCalendar,
    IconBuilding,
    IconCar4wd,
    IconAnalyze,
    IconUsers,
    IconCar,
 } 
    from '@tabler/icons-react';

export const links = [
    {link: '/dashboard', label: 'Dashboard', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/company-setup', label: 'Company Setup', sub_links: [
        {link: "/dashboard/position", label: "position"},
        {link: "/dashboard/agency", label: "agency"},
        {link: "/dashboard/departments", label:  "departments"},
        {link: "/dashboard/serviceses", label: "services"},
    ], icon: IconBuilding},
    {link: '/dashboard/employees', label: 'Employees', 
        sub_links: [
            {link: "/dashboard/add-employee", label: "Add Employee"},
            {link: "/dashboard/view-employees", label:  "View Employees"},
        ], icon: IconUsers},
    {link: '/dashboard/visitors', label: 'Visitors', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/appointment', label: 'Appointments', sub_links: [], icon: IconCalendar},
    {link: '/dashboard/vehicle', label: 'Vehicles', sub_links: [], icon: IconCar},
    {link: '/dashboard/attendance', label: 'Attendances', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/leave', label: 'Leaves', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/analytics', label: 'Analytics', sub_links: [], icon: IconAnalyze},
    {link: '/dashboard/reports', label: 'Reports', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/setting', label: 'Setting', sub_links: [], icon: IconDashboard},
]