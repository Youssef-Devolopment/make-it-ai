import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { cn } from '~/lib/utils';
import { Link } from '@remix-run/react';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames('flex items-center px-4 border-b h-[var(--header-height)] sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-md', {
        'border-transparent': !chat.started,
        'border-white/10': chat.started,
      })}
    >
      <div className="flex items-center gap-4 z-logo text-white cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center">
           <img src="/logo.png" alt="logo" className="h-7 w-auto mr-2" />
           <span className="hidden sm:inline">Bolt.diy</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
         {!chat.started && (
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full h-8 font-normal text-gray-400 bg-transparent hover:bg-white/10 hover:text-white"
                    )}
                    >
                    Explore
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-[#0a0a0a] border border-white/10">
                    <ul className="grid w-[400px] p-4">
                        <li className="p-2 hover:bg-white/5 rounded-md">
                            <h4 className="font-bold text-[#fb3a5d]">Models</h4>
                            <p className="text-xs text-gray-500">Access the latest LLMs directly.</p>
                        </li>
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
         )}
         {chat.started && (
            <span className="px-4 truncate text-center text-white/70 text-sm">
                <ClientOnly>{() => <ChatDescription />}</ClientOnly>
            </span>
         )}
      </div>

      <div className="flex items-center gap-3">
        {chat.started && (
            <ClientOnly>
                {() => (
                <div className="">
                    <HeaderActionButtons chatStarted={chat.started} />
                </div>
                )}
            </ClientOnly>
        )}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#fb3a5d] to-[#b44aff] p-[1px]">
            <div className="w-full h-full rounded-full bg-[#000000] flex items-center justify-center text-[10px] font-bold">
                BD
            </div>
        </div>
      </div>
    </header>
  );
}
