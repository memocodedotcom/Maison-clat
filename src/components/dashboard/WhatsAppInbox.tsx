import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Calendar,
  Plus,
  Flame,
  CheckCheck,
  Phone,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CONVERSATIONS_LIST } from '../../data/mockData';
import { MessageConversation } from '../../types';

export const WhatsAppInbox: React.FC = () => {
  const [conversations, setConversations] = useState<MessageConversation[]>(CONVERSATIONS_LIST);
  const [activeConvId, setActiveConvId] = useState<string>(CONVERSATIONS_LIST[0].id);
  const [inputMessage, setInputMessage] = useState<string>('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'staff' as const,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputMessage('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Unified WhatsApp & Meta Messaging</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Message Center & AI Assistant</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Répondez instantanément sur WhatsApp avec l'assistance de l'IA pour convertir vos prospects 24/7.
          </p>
        </div>
      </div>

      {/* 3-COLUMN INBOX LAYOUT */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[680px]">
        
        {/* LEFT COLUMN: CONVERSATION LIST */}
        <div className="lg:col-span-3 border-r border-stone-200 bg-[#FAF9F6] flex flex-col justify-between">
          <div className="p-4 border-b border-stone-200">
            <h3 className="font-serif font-semibold text-stone-900 text-sm">Discussions Actives</h3>
            <p className="text-[10px] text-stone-500">2 leads en attente de réponse</p>
          </div>

          <div className="divide-y divide-stone-200/60 overflow-y-auto flex-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-4 cursor-pointer transition flex items-start space-x-3 ${
                  activeConvId === conv.id ? 'bg-white border-l-4 border-brand-500 shadow-sm' : 'hover:bg-stone-100/80'
                }`}
              >
                <div className="relative">
                  <img src={conv.avatar} alt={conv.clientName} className="w-10 h-10 rounded-full object-cover border border-stone-300" />
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-stone-900 text-xs truncate">{conv.clientName}</h4>
                    <span className="text-[10px] text-stone-400 font-mono">{conv.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate font-light mt-0.5">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE COLUMN: CONVERSATION CHAT WINDOW */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-white">
          
          {/* Chat Top Bar */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center space-x-3">
              <img src={activeConv.avatar} alt={activeConv.clientName} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">{activeConv.clientName}</h4>
                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> WhatsApp en ligne
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              {activeConv.potentialValue} DH
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-[#FAF9F6]/40">
            {activeConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'client' ? 'items-start' : 'items-end'
                }`}
              >
                <div className="flex items-center space-x-1 mb-1">
                  {msg.isAiGenerated && (
                    <span className="text-[9px] font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Bot className="w-2.5 h-2.5 text-purple-600" /> Reponse IA validée
                    </span>
                  )}
                  <span className="text-[9px] text-stone-400 font-mono">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'client'
                      ? 'bg-white border border-stone-200 text-stone-900'
                      : msg.isAiGenerated
                      ? 'bg-gradient-to-r from-stone-900 to-charcoal-900 text-stone-100 border border-stone-800'
                      : 'bg-brand-500 text-stone-950 font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* AI SUGGESTED REPLY QUICK BAR */}
          <div className="p-3 bg-amber-50/70 border-t border-amber-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-[11px]">Créneau disponible suggéré pour vendredi 16h00</span>
            </div>
            <button
              onClick={() => handleSendMessage("Bonjour Sara ! Nous avons précisément un créneau vendredi à 16h00 à Casablanca Gautier. Souhaitez-vous le bloquer ? ✨")}
              className="px-3 py-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-[11px] transition shadow-sm"
            >
              Insérer la réponse IA →
            </button>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-stone-200 bg-white flex items-center space-x-3">
            <input
              type="text"
              placeholder="Écrivez votre message WhatsApp..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 rounded-full border border-stone-200 text-xs focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-3 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: CUSTOMER INTELLIGENCE */}
        <div className="lg:col-span-3 border-l border-stone-200 bg-[#FAF9F6] p-5 space-y-6 overflow-y-auto">
          
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-700">Intelligence Cliente</span>
            <h4 className="font-serif font-bold text-stone-900 text-base">{activeConv.clientName}</h4>
            <p className="text-xs text-stone-500">{activeConv.phone}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Soin convoité</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{activeConv.interestedTreatment}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Source Lead</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{activeConv.leadSource}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Température Lead</span>
              <span className="font-bold text-amber-600 block mt-0.5 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {activeConv.leadTemperature}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <button
              onClick={() => alert('Ouverture du module de réservation pour ce prospect')}
              className="w-full py-2.5 rounded-full bg-charcoal-900 text-brand-200 font-bold text-xs hover:bg-stone-800 transition flex items-center justify-center space-x-1.5 shadow"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver consultation</span>
            </button>

            <button
              onClick={() => alert('Tâche créée !')}
              className="w-full py-2.5 rounded-full border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition"
            >
              Créer une tâche
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
