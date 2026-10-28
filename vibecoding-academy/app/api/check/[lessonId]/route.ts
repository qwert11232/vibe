// ЗАЧЕМ: проверяет выполнение практики урока и отвечает списком PASS/FAIL
import { CHECKS } from '@/lib/checks';

export async function GET(request: Request, ctx: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await ctx.params;
  const checks = CHECKS[lessonId];
  if (!checks) return Response.json({ error: 'Для этого урока нет автопроверки' }, { status: 404 });
  const origin = new URL(request.url).origin;
  const results = await Promise.all(checks.map((c) => c(origin)));
  return Response.json({ lessonId, pass: results.every((r) => r.pass), results });
}
