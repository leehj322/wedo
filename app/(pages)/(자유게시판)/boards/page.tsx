import Link from "next/link";

export default function Boards() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div>-1</div>
      <div>0</div>
      <div>1</div>
      <Link className="text-blue-400" href="/board/0">
        게시물 상세 링크
      </Link>
      <Link className="text-blue-400" href="/addboard">
        게시물 등록 링크
      </Link>
    </main>
  );
}
