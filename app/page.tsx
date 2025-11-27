'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Sparkles, Users, TrendingUp, Mail } from 'lucide-react';
import Image from 'next/image';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase() }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('Cet email est déjà inscrit sur la liste d\'attente !');
        } else {
          setMessage('Une erreur est survenue. Veuillez réessayer.');
        }
        setStatus('error');
      } else {
        setMessage('Merci ! Vous êtes maintenant sur la liste d\'attente.');
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shiftly-blanc via-white to-shiftly-gris/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-6">
              <Image
                src="/assets/logo-shiftly.png"
                alt="Shiftly Logo"
                width={200}
                height={200}
                className="mx-auto"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shiftly-mauve mb-6">
              Révolutionnez le recrutement
              <br />
              <span className="bg-gradient-to-r from-shiftly-violet to-shiftly-gold bg-clip-text text-transparent">
                dans l'HCR
              </span>
            </h1>

            <p className="text-lg md:text-xl text-shiftly-marron max-w-2xl mx-auto mb-8">
              La première plateforme de matching intelligent qui connecte les talents freelance
              avec les meilleurs établissements d'hôtellerie et de restauration.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-shiftly-marron mb-12">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-shiftly-violet" />
                <span>Hospitalité</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-shiftly-gold" />
                <span>Fiabilité</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-shiftly-violet" />
                <span>Liberté</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-shiftly-gris/30">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-shiftly-mauve mb-3">
                Rejoignez la liste d'attente
              </h2>
              <p className="text-shiftly-marron">
                Soyez parmi les premiers à découvrir Shiftly lors de notre lancement
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="h-12 text-base border-shiftly-gris focus:border-shiftly-violet focus:ring-shiftly-violet"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-shiftly-violet to-shiftly-gold hover:from-shiftly-mauve hover:to-shiftly-gold/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Envoi...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      S'inscrire
                    </span>
                  )}
                </Button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-4 rounded-lg text-sm ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>

            <div className="mt-8 text-center text-sm text-shiftly-marron">
              En vous inscrivant, vous acceptez de recevoir des mises à jour sur le lancement de Shiftly.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-shiftly-gris/30 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-shiftly-violet to-shiftly-gold flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-shiftly-mauve mb-2">Matching Intelligent</h3>
              <p className="text-shiftly-marron text-sm">
                Un système de matching type Tinder pour trouver les opportunités parfaites
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-shiftly-gris/30 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-shiftly-violet to-shiftly-gold flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-shiftly-mauve mb-2">Profils Certifiés</h3>
              <p className="text-shiftly-marron text-sm">
                Vérification et certification des freelances pour garantir la qualité
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-shiftly-gris/30 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-shiftly-violet to-shiftly-gold flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-shiftly-mauve mb-2">Communication Intégrée</h3>
              <p className="text-shiftly-marron text-sm">
                Outils de communication et suivi intégrés pour une collaboration fluide
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-shiftly-marron text-sm">
              Une question ? Contactez-nous à{' '}
              <a
                href="mailto:contact@shiftly.com"
                className="text-shiftly-violet hover:text-shiftly-gold font-medium transition-colors"
              >
                contact@shiftly.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
