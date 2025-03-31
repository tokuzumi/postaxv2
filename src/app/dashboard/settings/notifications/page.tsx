export const metadata = {
  title: "Notificações | Postax",
  description: "Gerenciar notificações da plataforma",
};

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Notificações</h1>
      <p className="text-gray-400 mb-8">
        Visualize seu histórico de notificações e configurações de alertas
      </p>

      <div className="space-y-6">
        <div className="bg-[#1D1F2B] rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[#414151] flex justify-between items-center">
            <h2 className="text-xl font-semibold">Histórico de Notificações</h2>
            <button className="text-sm text-gray-400 hover:text-white">
              Marcar todas como lidas
            </button>
          </div>
          
          <div className="divide-y divide-[#414151]">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 flex items-start hover:bg-[#252736] transition-colors ${!notification.read ? 'bg-[#252736]/50' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getNotificationIconColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
          
          {notifications.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-1">Nenhuma notificação</h3>
              <p className="text-gray-400">Você não tem notificações para visualizar no momento.</p>
            </div>
          )}
        </div>
        
        <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Configurações de Notificações</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#252736] rounded-lg">
              <div>
                <h3 className="font-medium">Notificações por e-mail</h3>
                <p className="text-sm text-gray-400">Receber alertas no seu e-mail</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-700 rounded-full">
                <label className="absolute left-0 inline-block w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"></label>
                <input type="checkbox" className="w-full h-full opacity-0 cursor-pointer" defaultChecked />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#252736] rounded-lg">
              <div>
                <h3 className="font-medium">Notificações de publicações</h3>
                <p className="text-sm text-gray-400">Ser notificado quando posts forem publicados</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-700 rounded-full">
                <label className="absolute left-0 inline-block w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"></label>
                <input type="checkbox" className="w-full h-full opacity-0 cursor-pointer" defaultChecked />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#252736] rounded-lg">
              <div>
                <h3 className="font-medium">Alertas de engajamento</h3>
                <p className="text-sm text-gray-400">Receber alertas sobre engajamento excepcional</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-700 rounded-full">
                <label className="absolute left-0 inline-block w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-0"></label>
                <input type="checkbox" className="w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tipos de notificações
type NotificationType = 'success' | 'info' | 'warning' | 'error';

// Interface para a estrutura de notificações
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

// Dados de exemplo
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Post publicado com sucesso',
    message: 'Seu post "Dicas para aumentar engajamento" foi publicado no Instagram.',
    time: 'Há 2 horas',
    type: 'success',
    read: false
  },
  {
    id: '2',
    title: 'Agendamento confirmado',
    message: 'Um novo post foi agendado para publicação amanhã às 10:00.',
    time: 'Há 5 horas',
    type: 'info',
    read: false
  },
  {
    id: '3',
    title: 'Conexão interrompida',
    message: 'A conexão com sua conta do Facebook foi interrompida, por favor reconecte.',
    time: 'Há 1 dia',
    type: 'warning',
    read: true
  },
  {
    id: '4',
    title: 'Postagem falhou',
    message: 'Não foi possível publicar no TikTok devido a um problema na API.',
    time: 'Há 2 dias',
    type: 'error',
    read: true
  }
];

// Funções para renderização condicional de ícones e cores
function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'success':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'info':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'warning':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'error':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
  }
}

function getNotificationIconColor(type: NotificationType) {
  switch (type) {
    case 'success':
      return 'bg-green-500/20 text-green-500';
    case 'info':
      return 'bg-blue-500/20 text-blue-500';
    case 'warning':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'error':
      return 'bg-red-500/20 text-red-500';
  }
} 