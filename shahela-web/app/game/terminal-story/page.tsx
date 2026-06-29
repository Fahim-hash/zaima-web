'use client';

import React, { useState } from 'react';

// Story Tree Nodes Structure
interface StoryNode {
  id: string;
  text: string;
  choices: {
    text: string;
    nextNode: string;
  }[];
}

const storyTree: Record<string, StoryNode> = {
  start: {
    id: 'start',
    text: 'SYSTEM_ALERT: Backup power activated. You are inside a locked server vault. The main console displays an active decryption sequence counter.',
    choices: [
      { text: 'Override the main console manual bypass.', nextNode: 'override' },
      { text: 'Vent the server room atmosphere to slow down processing hardware.', nextNode: 'vent' }
    ]
  },
  override: {
    id: 'override',
    text: 'CRITICAL: The manual bypass requires an authorization token. Firewalls are actively trace-routing your access point.',
    choices: [
      { text: 'Attempt a brute-force memory injection.', nextNode: 'fail_brute' },
      { text: 'Redirect terminal power lines to fry the network interface card.', nextNode: 'success_escape' }
    ]
  },
  vent: {
    id: 'vent',
    text: 'The cooling arrays freeze over. Decryption slows down, but structural failure alarms are triggered. The automated lockdown gates start sealing.',
    choices: [
      { text: 'Slide under the closing blast door immediately.', nextNode: 'success_escape' },
      { text: 'Stay inside to pull out the hard drive storage array.', nextNode: 'fail_trapped' }
    ]
  },
  success_escape: {
    id: 'success_escape',
    text: 'PROTOCOL_CLEARED: You successfully neutralized the security grid and escaped into the clear web. Nodes cleared.',
    choices: []
  },
  fail_brute: {
    id: 'fail_brute',
    text: 'CONNECTION_TERMINATED: The trace-route completed before injection finished. Security vectors isolated your terminal.',
    choices: []
  },
  fail_trapped: {
    id: 'fail_trapped',
    text: 'SYSTEM_HALT: The blast door locked fully. You secured the data, but oxygen limits have been exhausted. Terminal offline.',
    choices: []
  }
};

export default function TerminalStoryEngine() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);

  const currentNode = storyTree[currentNodeId];

  const handleChoiceSelect = (nextNodeId: string) => {
    setHistory((prev) => [...prev, currentNode.text]);
    setCurrentNodeId(nextNodeId);
  };

  const restartEngine = () => {
    setCurrentNodeId('start');
    setHistory([]);
  };

  const isEndingNode = currentNode.choices.length === 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 font-sans antialiased">
      
      {/* Top Protocol Header */}
      <header className="max-w-xl w-full mx-auto border border-zinc-900 bg-zinc-900/20 backdrop-blur rounded-2xl p-5 flex justify-between items-center shadow-xl mt-4">
        <div className="space-y-1">
          <h1 className="text-sm font-black tracking-widest text-zinc-400 uppercase">STORY_ENGINE // P7</h1>
          <p className="text-xs font-mono text-zinc-500">
            {isEndingNode ? 'Session execution terminated.' : 'Awaiting manual confirmation input...'}
          </p>
        </div>

        <div className="bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800 text-center font-mono text-xs text-zinc-400">
          Node: {currentNodeId.toUpperCase()}
        </div>
      </header>

      {/* Main Terminal Feed */}
      <main className="max-w-xl w-full mx-auto my-auto py-8 space-y-6">
        
        {/* Render History Log */}
        <div className="space-y-4 opacity-30 text-xs font-mono select-none pointer-events-none max-h-[150px] overflow-hidden">
          {history.map((log, index) => (
            <p key={index} className="border-l border-zinc-800 pl-3">
              {log}
            </p>
          ))}
        </div>

        {/* Current Active Output */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 shadow-inner">
          <p className="text-sm font-mono leading-relaxed text-zinc-300">
            {currentNode.text}
          </p>
        </div>

        {/* Command Controls / Choices */}
        <div className="space-y-3 pt-4">
          {currentNode.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoiceSelect(choice.nextNode)}
              className="w-full text-left p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all font-mono text-xs flex items-start gap-3 group text-zinc-400 hover:text-white"
            >
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">[0{idx + 1}]</span>
              <span className="flex-1">{choice.text}</span>
            </button>
          ))}

          {/* Ending Reset Link */}
          {isEndingNode && (
            <div className="text-center pt-6">
              <button
                onClick={restartEngine}
                className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-zinc-200 transition shadow-md"
              >
                Re-initialize Sequence
              </button>
            </div>
          )}
        </div>

      </main>

      {/* System Interface Footer */}
      <footer className="max-w-xl w-full mx-auto flex justify-between items-center border-t border-zinc-900/60 pt-4 mb-4 text-[10px] font-mono text-zinc-600">
        <span>LINEAR_DECISION MODULE</span>
        <span>2026 // LOG</span>
      </footer>

    </div>
  );
}
