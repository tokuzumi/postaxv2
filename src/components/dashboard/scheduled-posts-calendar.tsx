'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/types/post';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Share2 } from 'lucide-react';

interface ScheduledPostsCalendarProps {
  className?: string;
}

export function ScheduledPostsCalendar({ className }: ScheduledPostsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(new Date()));
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const fetchScheduledPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Falha ao carregar posts');
      const data = await response.json();
      const posts = data
        .filter((post: Post) => post.status === 'scheduled')
        .map((post: Post) => ({
          ...post,
          scheduledDate: post.scheduledDate ? startOfDay(new Date(post.scheduledDate)) : null
        }));
      setScheduledPosts(posts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostsForDate = (date: Date) => {
    const normalizedDate = startOfDay(date);
    return scheduledPosts.filter(post => {
      if (!post.scheduledDate) return false;
      return post.scheduledDate.getTime() === normalizedDate.getTime();
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const normalizedDate = startOfDay(date);
      setSelectedDate(normalizedDate);
    }
  };

  const renderDayContent = (date: Date) => {
    const posts = getPostsForDate(date);
    return (
      <div className="relative w-full h-full">
        <span>{date.getDate()}</span>
        {posts.length > 0 && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs"
          >
            {posts.length}
          </Badge>
        )}
      </div>
    );
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              defaultMonth={selectedDate}
              components={{
                DayContent: ({ date }) => renderDayContent(date)
              }}
              className="w-full"
            />
          </div>
          
          <div className="lg:col-span-7">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Posts Agendados para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </h3>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : selectedDatePosts.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {selectedDatePosts.map(post => (
                  <div key={post.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-lg">{post.title}</h4>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.scheduledDate ? format(new Date(post.scheduledDate), "HH:mm") : ''}
                      </div>
                    </div>
                    
                    <p className="mt-2 text-gray-400 line-clamp-2">{post.content}</p>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-gray-500" />
                      <div className="flex gap-2">
                        {post.socialNetworks.map((network: string) => (
                          <Badge key={network} variant="outline">
                            {network}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
                <p>Nenhum post agendado para esta data</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 