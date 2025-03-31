"use client";

interface UserProfileProps {
  userName: string;
  userEmail: string;
  userInitials: string;
}

export function UserProfile({ userName, userEmail, userInitials }: UserProfileProps) {
  return (
    <div className="border-t border-[#414151] pt-4 mt-2">
      <div className="flex items-center px-2 py-2">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
          {userInitials}
        </div>
        <div className="ml-3">
          <div className="text-white font-medium text-sm">{userName}</div>
          <div className="text-gray-400 text-xs">{userEmail}</div>
        </div>
      </div>
    </div>
  );
} 