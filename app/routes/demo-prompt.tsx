import { Header } from "~/components/ui/vercel-navbar";
import { PromptInputBox } from "~/components/ui/ai-prompt-box";
import { BackgroundPlus } from "~/components/ui/background-plus";
import { ThemeProvider } from "next-themes";

export default function DemoPrompt() {
  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('Message:', message);
    console.log('Files:', files);
  };

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark">
      <div className="relative min-h-screen bg-[#000000] text-white overflow-hidden font-sans">
        {/* Blake Theme: Deep black background with subtle plus pattern */}
        <BackgroundPlus plusColor="#333333" plusSize={40} fade={true} />

        <Header />

        <main className="relative flex flex-col items-center justify-center p-4 pt-32 z-10">
           <div className="w-full max-w-2xl space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl">
                Blake <span className="text-[#fb3a5d]">Prompt</span>
              </h1>
              <p className="text-gray-400 text-xl max-w-[600px] mx-auto">
                A minimalist, high-performance AI interface designed for focus and speed.
              </p>
            </div>

            <div className="bg-[#111111]/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-pink-500/5">
                <PromptInputBox
                    onSend={handleSendMessage}
                    placeholder="Ask blake anything..."
                    className="bg-transparent border-none shadow-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="p-8 rounded-[2rem] border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm hover:border-white/10 transition-colors group">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#fb3a5d]" />
                        Blake Core
                    </h3>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            True Black Aesthetic
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            Subtle Pattern Overlays
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            Pink Accent Highlights
                        </li>
                    </ul>
                </div>
                <div className="p-8 rounded-[2rem] border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm hover:border-white/10 transition-colors">
                    <h3 className="font-bold text-lg mb-3">System Identity</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        The Blake theme emphasizes content through high contrast and minimal ornamentation. Every element is refined for clarity.
                    </p>
                </div>
            </div>
          </div>
        </main>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fb3a5d]/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </div>
    </ThemeProvider>
  );
}
