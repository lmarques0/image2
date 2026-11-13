'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button, Input, Template } from '../components'

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

const loginCandidates = [
  `${apiBase}/login`,
  `${apiBase}/auth/login`,
  `${apiBase}/users/login`,
  `${apiBase}/api/login`,
  `${apiBase}/api/auth/login`,
  `${apiBase}/api/users/login`,
]

function extractToken(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null

  const candidate = payload as Record<string, unknown>

  if (typeof candidate.accessToken === 'string') return candidate.accessToken
  if (typeof candidate.token === 'string') return candidate.token
  if (typeof candidate.jwt === 'string') return candidate.jwt

  if (candidate.data && typeof candidate.data === 'object') {
    const nested = candidate.data as Record<string, unknown>
    if (typeof nested.accessToken === 'string') return nested.accessToken
    if (typeof nested.token === 'string') return nested.token
  }

  return null
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Informe seu e-mail e sua senha.')
      return
    }

    setLoading(true)
    setError('')

    let lastError: unknown = null

    try {
      for (const url of loginCandidates) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email.trim(),
              password,
            }),
          })

          if (!response.ok) {
            lastError = new Error(`${response.status} ${response.statusText}`)
            continue
          }

          const payload = await response.json()
          const token = extractToken(payload)

          if (!token) {
            throw new Error('Login realizado, mas nenhum token foi retornado.')
          }

          localStorage.setItem('image_token', token)
          router.push('/galeria')
          return
        } catch (attemptError) {
          lastError = attemptError
        }
      }

      throw lastError ?? new Error('Não foi possível fazer login.')
    } catch (submitError) {
      console.error(submitError)
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível realizar o login.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Template>
      <main className="flex min-h-[85vh] items-center justify-center bg-white px-5 py-12 text-black">

        <div className="w-full max-w-[390px]">

          {/* Logo */}
          <div className="mb-12 text-center">
            <Link href="/" className="text-2xl font-black tracking-[-0.07em]">
              ImageLite<span className="text-black/30">.</span>
            </Link>
          </div>

          {/* Título */}
          <div className="mb-9 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Entrar
            </h1>

            <p className="mt-2 text-sm text-black/45">
              Acesse sua conta.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between gap-3 text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-black/50">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-black"
                />
                Lembrar-me
              </label>

              <Link
                href="/"
                className="font-semibold text-black transition hover:text-black/50"
              >
                Esqueci a senha
              </Link>
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

          </form>

          {/* Rodapé */}
          <div className="mt-8 border-t border-black/10 pt-6 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-black/45 transition hover:text-black"
            >
              ← Voltar ao início
            </Link>
          </div>

        </div>
      </main>
    </Template>
  )
}