import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, ButtonModule, ToastModule, TableModule, ChartModule, BadgeModule],
  providers: [MessageService]
})
export class DashboardComponent {
  statistics = [
    { label: 'Total Articles', value: '142', icon: 'pi-file', iconClass: 'text-blue-500' },
    { label: 'Active Users', value: '2,854', icon: 'pi-users', iconClass: 'text-green-500' },
    { label: 'Engagement Rate', value: '68%', icon: 'pi-chart-line', iconClass: 'text-orange-500' }
  ];

  recentNews = [
    { title: 'New Environmental Policy Announced', category: 'Politics', categoryClass: 'bg-blue-100 text-blue-800', date: '2 hours ago' },
    { title: 'Tech Company Launches Revolutionary Product', category: 'Technology', categoryClass: 'bg-purple-100 text-purple-800', date: '5 hours ago' },
    { title: 'Sports Team Wins Championship', category: 'Sports', categoryClass: 'bg-green-100 text-green-800', date: '1 day ago' },
    { title: 'Economic Summit Results in New Agreement', category: 'Business', categoryClass: 'bg-amber-100 text-amber-800', date: '2 days ago' }
  ];

  chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Page Views',
        data: [12500, 19200, 17900, 24800, 24000, 31000],
        fill: false,
        borderColor: '#4bc0c0',
        tension: 0.4
      },
      {
        label: 'User Engagement',
        data: [5800, 9600, 8700, 11900, 15600, 18800],
        fill: false,
        borderColor: '#ff6384',
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  notifications = [
    { message: 'New article submitted for review', time: '10 minutes ago', icon: 'pi-bell', iconClass: 'text-blue-500' },
    { message: 'User reported an issue with comments', time: '2 hours ago', icon: 'pi-exclamation-circle', iconClass: 'text-orange-500' },
    { message: 'System update scheduled for tomorrow', time: '1 day ago', icon: 'pi-info-circle', iconClass: 'text-purple-500' }
  ];

  constructor(private msg: MessageService) {}

  hello() {
    this.msg.add({ severity: 'success', summary: 'Action Triggered', detail: 'User settings menu will be available soon!' });
  }
}