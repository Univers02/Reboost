import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Bell, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface AdminMessage {
  id: string;
  subject: string;
  content: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  deliveredAt: string;
}

export default function NotificationsBox() {
  const { data: messages, isLoading } = useQuery<AdminMessage[]>({
    queryKey: ['/api/messages'],
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('POST', `/api/messages/${id}/read`, {});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const unreadCount = messages?.filter(m => !m.isRead).length || 0;

  return (
    <Card data-testid="card-notifications">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </span>
          {unreadCount > 0 && (
            <Badge variant="destructive" data-testid="badge-unread-count">
              {unreadCount} non {unreadCount > 1 ? 'lues' : 'lue'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-20 bg-muted animate-pulse rounded" />
            <div className="h-20 bg-muted animate-pulse rounded" />
          </div>
        ) : messages && messages.length > 0 ? (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3" data-testid="list-notifications">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-all ${
                    message.isRead 
                      ? 'bg-muted/50 border-muted' 
                      : 'bg-background border-primary/50 shadow-sm'
                  }`}
                  data-testid={`notification-${message.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(message.severity)}
                        <h4 className="font-semibold text-sm">{message.subject}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.deliveredAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    {!message.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsReadMutation.mutate(message.id)}
                        disabled={markAsReadMutation.isPending}
                        data-testid={`button-mark-read-${message.id}`}
                      >
                        Marquer lu
                      </Button>
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${getSeverityColor(message.severity)}`}
                  >
                    {message.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucune notification</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
