import React, { useRef } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST } from '~/utils/constants';
import { ModelSelector } from '~/components/chat/ModelSelector';
import { APIKeyManager } from './APIKeyManager';
import { LOCAL_PROVIDERS } from '~/lib/stores/settings';
import { PromptInputBox } from '~/components/ui/ai-prompt-box';
import type { ProviderInfo } from '~/types/model';
import type { DesignScheme } from '~/types/design-scheme';
import type { ElementInfo } from '~/components/workbench/Inspector';

interface ChatBoxProps {
  isModelSettingsCollapsed: boolean;
  setIsModelSettingsCollapsed: (collapsed: boolean) => void;
  provider: any;
  providerList: any[];
  modelList: any[];
  apiKeys: Record<string, string>;
  isModelLoading: string | undefined;
  onApiKeysChange: (providerName: string, apiKey: string) => void;
  uploadedFiles: File[];
  imageDataList: string[];
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined;
  input: string;
  handlePaste: (e: React.ClipboardEvent) => void;
  TEXTAREA_MIN_HEIGHT: number;
  TEXTAREA_MAX_HEIGHT: number;
  isStreaming: boolean;
  handleSendMessage: (event: React.UIEvent, messageInput?: string) => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  chatStarted: boolean;
  exportChat?: () => void;
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;
  handleFileUpload: () => void;
  setProvider?: ((provider: ProviderInfo) => void) | undefined;
  model?: string | undefined;
  setModel?: ((model: string) => void) | undefined;
  setUploadedFiles?: ((files: File[]) => void) | undefined;
  setImageDataList?: ((dataList: string[]) => void) | undefined;
  handleInputChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  handleStop?: (() => void) | undefined;
  enhancingPrompt?: boolean | undefined;
  enhancePrompt?: (() => void) | undefined;
  onWebSearchResult?: (result: string) => void;
  chatMode?: 'discuss' | 'build';
  setChatMode?: (mode: 'discuss' | 'build') => void;
  designScheme?: DesignScheme;
  setDesignScheme?: (scheme: DesignScheme) => void;
  selectedElement?: ElementInfo | null;
  setSelectedElement?: ((element: ElementInfo | null) => void) | undefined;
}

export const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const handleSend = (message: string, files?: File[]) => {
    if (props.handleInputChange) {
        props.handleInputChange({ target: { value: message } } as any);
    }
    if (files && props.setUploadedFiles) {
        props.setUploadedFiles(files);
    }

    // Trigger send in the next tick to ensure state is updated
    setTimeout(() => {
        props.handleSendMessage({} as any, message);
    }, 0);
  };

  return (
    <div className="w-full max-w-chat mx-auto space-y-4">
        {/* Model Settings and UI Overlays */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-3">
             <ClientOnly>
                {() => (
                    <div className={props.isModelSettingsCollapsed ? 'hidden' : ''}>
                    <ModelSelector
                        key={props.provider?.name + ':' + props.modelList.length}
                        model={props.model}
                        setModel={props.setModel}
                        modelList={props.modelList}
                        provider={props.provider}
                        setProvider={props.setProvider}
                        providerList={props.providerList || (PROVIDER_LIST as ProviderInfo[])}
                        apiKeys={props.apiKeys}
                        modelLoading={props.isModelLoading}
                    />
                    {(props.providerList || []).length > 0 &&
                        props.provider &&
                        !LOCAL_PROVIDERS.includes(props.provider.name) && (
                        <APIKeyManager
                            provider={props.provider}
                            apiKey={props.apiKeys[props.provider.name] || ''}
                            setApiKey={(key) => {
                            props.onApiKeysChange(props.provider.name, key);
                            }}
                        />
                        )}
                    </div>
                )}
            </ClientOnly>

            <div className="flex items-center justify-between mt-2 px-2">
                <button
                    onClick={() => props.setIsModelSettingsCollapsed(!props.isModelSettingsCollapsed)}
                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                    {props.isModelSettingsCollapsed ? `Model: ${props.model}` : 'Collapse Settings'}
                </button>
                {props.isStreaming && (
                    <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#fb3a5d] animate-pulse" />
                         <span className="text-[10px] uppercase tracking-widest text-[#fb3a5d]">Streaming</span>
                    </div>
                )}
            </div>
        </div>

        {/* The new Blake Prompt Box */}
        <div className="bg-[#111111]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl shadow-pink-500/5 overflow-hidden">
            <PromptInputBox
                onSend={handleSend}
                isLoading={props.isStreaming}
                placeholder={props.chatMode === 'build' ? "Describe your vision..." : "Let's discuss..."}
                className="bg-transparent border-none shadow-none p-4"
            />
        </div>

        {props.selectedElement && (
            <div className="flex items-center justify-between bg-[#fb3a5d]/10 border border-[#fb3a5d]/20 rounded-full px-4 py-1.5 mx-8">
                <span className="text-[10px] text-[#fb3a5d] font-bold uppercase tracking-wider">
                   Inspecting: {props.selectedElement.tagName}
                </span>
                <button onClick={() => props.setSelectedElement?.(null)} className="text-[10px] text-gray-400 hover:text-white underline">
                    Clear
                </button>
            </div>
        )}
    </div>
  );
};
