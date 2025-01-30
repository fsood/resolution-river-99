// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Search,
//   Star,
//   HelpCircle,
//   MoreVertical,
// } from "lucide-react";

// const reports = [
//   {
//     name: "Adoption reports",
//     type: "Curated",
//     createdBy: "System",
//     createdDate: "12/02/2024",
//     lastModified: "12/02/2024",
//   },
//   {
//     name: "Satisfaction Survey Reports",
//     type: "Curated",
//     createdBy: "System",
//     createdDate: "12/02/2024",
//     lastModified: "12/02/2024",
//   },
//   {
//     name: "Freddy Reports",
//     type: "Curated",
//     createdBy: "System",
//     createdDate: "12/02/2024",
//     lastModified: "12/02/2024",
//   },
//   {
//     name: "Customer Analysis report",
//     type: "Curated",
//     createdBy: "System",
//     createdDate: "11/28/2024",
//     lastModified: "11/28/2024",
//   },
//   {
//     name: "Timesheet Summary Report",
//     type: "Curated",
//     createdBy: "System",
//     createdDate: "11/28/2024",
//     lastModified: "11/28/2024",
//   },
// ];

// const AllReports = () => {
//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full">
//         <div className="flex-1">
//           <header className="bg-white border-b sticky top-0 z-10">
//             <div className="container mx-auto px-4 py-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold text-primary">All Reports</h1>
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <Input
//                       type="search"
//                       placeholder="Search"
//                       className="pl-10 w-64"
//                     />
//                   </div>
//                   <Button variant="outline" className="flex items-center gap-2">
//                     <HelpCircle className="w-4 h-4" />
//                     Help Center
//                   </Button>
//                   <Button className="bg-primary text-white">New Report</Button>
//                 </div>
//               </div>
//             </div>
//           </header>
//           <main className="container mx-auto px-4 py-8">
//             <div className="bg-white rounded-lg shadow">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-12"></TableHead>
//                     <TableHead>Report Name</TableHead>
//                     <TableHead>Created by</TableHead>
//                     <TableHead>Created date</TableHead>
//                     <TableHead>Last Modified by</TableHead>
//                     <TableHead>Last Modified date</TableHead>
//                     <TableHead className="w-12"></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {reports.map((report, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <Star className="w-4 h-4 text-gray-400" />
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           {report.name}
//                           <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                             {report.type}
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{report.createdBy}</TableCell>
//                       <TableCell>{report.createdDate}</TableCell>
//                       <TableCell>--</TableCell>
//                       <TableCell>{report.lastModified}</TableCell>
//                       <TableCell>
//                         <Button variant="ghost" size="icon">
//                           <MoreVertical className="w-4 h-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default AllReports;