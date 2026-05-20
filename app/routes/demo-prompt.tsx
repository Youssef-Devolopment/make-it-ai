import { Header } from "~/components/ui/vercel-navbar";
import { PromptInputBox } from "~/components/ui/ai-prompt-box";
import { ThemeProvider } from "next-themes";

export default function DemoPrompt() {
  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('Message:', message);
    console.log('Files:', files);
  };

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex flex-col items-center justify-center p-4 pt-20">
           <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">AI Prompt Box</h1>
              <p className="text-muted-foreground text-lg">
                A beautiful, interactive prompt input for your AI applications.
              </p>
            </div>

            <div className="bg-card p-4 rounded-3xl border border-border">
                <PromptInputBox
                    onSend={handleSendMessage}
                    placeholder="Ask anything..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-2">Features</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Image uploads & Drag-and-drop</li>
                        <li>Voice recording UI</li>
                        <li>Toggleable modes (Search, Think, Canvas)</li>
                        <li>Responsive design</li>
                    </ul>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                        Try pasting an image, clicking the microphone, or toggling the different search modes. The interface adapts to the project's theme.
                    </p>
                </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
