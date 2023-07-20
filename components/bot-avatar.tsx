import { Avatar, AvatarImage } from "./ui/avatar";

export default function BotAvatar() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="/logo.png" />
    </Avatar>
  )
}