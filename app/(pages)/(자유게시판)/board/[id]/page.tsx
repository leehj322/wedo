/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import Image from "next/image";

import { postArticleComment } from "@/apis/articleComment";
import { Button } from "@/components/@common/Button";
import Textarea from "@/components/@common/Textarea";
import defaultProfile from "@/public/images/default_profile.png";
import Comment from "@/public/svg/comment.svg";
import Like from "@/public/svg/like.svg";

export default async function Board({ params }: { params: { id: number } }) {
  const getArticledDetail = await fetch(
    `https://fe-project-cowokers.vercel.app/8-7/articles/${params.id}`,
  );
  const article = await getArticledDetail.json();

  const getArticleComment = await fetch(
    `https://fe-project-cowokers.vercel.app/8-7/articles/${params.id}/comments?limit=5`,
  );
  const Comments = await getArticleComment.json();
  // console.log({ Comment: Comments });
  // console.log({ Comment: Comments.list });

  async function addArticleComment(formData: FormData) {
    "use server";

    // console.log(formData);
    // formData.set("content", "");
    // console.log(formData);

    const req = {
      content: formData.get("content") as string,
    };

    await postArticleComment(params.id, req);

    revalidatePath(`/board/${params.id}`);
  }

  return (
    <main className="mx-auto mt-[60px] flex max-w-[1248px] flex-col gap-y-20 px-4 pb-8 pt-10 tab:px-6 tab:pt-14">
      <article className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4 py-6">
          <header className="flex min-h-6 items-center justify-between">
            <h1 className="lg-medium text-default-light tab:2lg-medium">
              {article.title}
            </h1>

            {/* 유저 정보가 맞으면 버거 버튼 띄우기 */}
          </header>

          <hr />

          <footer className="flex justify-between">
            <div className="flex items-center gap-x-4">
              <address className="xs-medium flex items-center justify-between gap-x-3 text-default-light tab:md-medium">
                {/* 유저 프로필 정보가 없음 물어보기 */}
                <Image
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                  src={defaultProfile}
                />

                {article.writer.nickname}
              </address>

              <hr className="h-4 w-px border-0 bg-slate-700" />

              <time className="xs-medium text-secondary-light tab:md-medium">
                {article.createdAt}
              </time>
              {/* 변환해주는 코드 추가하기 */}
            </div>

            <section className="flex gap-x-4">
              <figure className="flex items-center">
                <Comment />

                <figcaption className="xs-normal text-slate-400 tab:md-normal">
                  {article.commentCount}
                </figcaption>
              </figure>

              <figure className="flex items-center">
                <Like />

                <figcaption className="xs-normal text-slate-400 tab:md-normal">
                  {article.likeCount}
                </figcaption>
              </figure>
            </section>
          </footer>
        </div>

        <div>
          {article.image && (
            <figure className="relative float-right size-20 overflow-hidden rounded-xl tab:size-40">
              <Image alt="게시글 이미지" src={article.image} fill />
            </figure>
          )}

          <p className="md-normal leading-6 text-default-light [overflowWrap:anywhere] tab:lg-normal tab:leading-7">
            {article.content}
          </p>
        </div>
      </article>

      <section className="flex flex-col gap-y-8 tab:gap-10">
        <form action={addArticleComment} className="flex flex-col gap-y-4">
          <label
            htmlFor="boardContentTextarea"
            className="lg-medium flex flex-col gap-y-4 text-default-light tab:xl-bold tab:gap-y-6"
          >
            댓글달기
            <Textarea
              id="boardContentTextarea"
              name="content"
              Padding="lg"
              BoxSize="md"
              placeholder="댓글을 입력해주세요."
              required
              autoFocus
            />
          </label>

          <Button
            type="submit"
            size="sm"
            className="w-20 self-end tab:lg-semibold tab:h-12 tab:w-48"
          >
            등록
          </Button>
        </form>

        <hr />

        <ol className="flex flex-col gap-y-4">
          {Comments.list.map((comment: any) => (
            <li key={comment.id}>
              <article className="flex w-full flex-col gap-y-8 rounded-xl bg-primary-light p-4 tab:px-6 tab:py-5">
                <p className="[overflowWrap:anywhere]">{comment.content}</p>

                {/* 유저 정보가 맞으면 버거 버튼 띄우기 */}
                <footer className="flex justify-between">
                  <div className="flex items-center gap-x-4">
                    <address className="xs-medium flex items-center justify-between gap-x-3 text-default-light tab:md-medium">
                      <Image
                        alt="프로필 이미지"
                        width={32}
                        height={32}
                        src={defaultProfile}
                      />

                      {article.writer.nickname}
                    </address>

                    <hr className="h-4 w-px border-0 bg-slate-700" />

                    <time className="xs-medium text-secondary-light tab:md-medium">
                      {article.createdAt}
                    </time>
                    {/* 변환해주는 코드 추가하기 */}
                  </div>

                  {/* api로 안 보내줌 물어보기 */}
                  {/*
                  <section>
                    <p>{comment.commentCount}</p>

                    하트 svg 아이콘

                    <p>{comment.likeCount}</p>
                  </section>
                  */}
                </footer>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
