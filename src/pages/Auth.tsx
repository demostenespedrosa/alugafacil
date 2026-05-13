import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { Shield } from "lucide-react";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/guest");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/guest");
    } catch (err: any) {
      setError(err.message || "Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[40px] border border-black/5 p-8 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#2A3B31] rounded-3xl flex items-center justify-center text-white mb-4">
             <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-light tracking-tighter text-[#1A1A1A]">
            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-black/40 mt-2 text-center">
            Acesse milhares de lares pelo Brasil
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 pl-4">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F7F4] rounded-full px-6 py-4 text-sm font-medium outline-none border border-black/5"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 pl-4">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F7F4] rounded-full px-6 py-4 text-sm font-medium outline-none border border-black/5"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2A3B31] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#1A251E] transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? "Aguarde..." : (isLogin ? "Entrar" : "Cadastrar")}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] bg-black/5 flex-1"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">OU</span>
          <div className="h-[1px] bg-black/5 flex-1"></div>
        </div>

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white border border-black/10 text-[#1A1A1A] font-bold py-4 rounded-full text-xs flex items-center justify-center gap-3 hover:bg-[#F8F7F4] transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continuar com Google
        </button>

        <p className="mt-8 text-center text-xs font-medium text-[#1A1A1A]/60">
          {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold border-b border-[#1A1A1A] hover:text-[#E58E58] hover:border-[#E58E58] transition-colors"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}
