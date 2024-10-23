/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

import Input from "@/components/@common/Input";
// import BestBadge from "@/components/board/BestBadge";
import defaultProfile from "@/public/images/default_profile.png";
import Like from "@/public/svg/like.svg";

export default async function Boards() {
  const getBestArticle = await fetch(
    "https://fe-project-cowokers.vercel.app/8-7/articles?pageSize=3&orderBy=like",
  );
  const BestArticles = await getBestArticle.json();
  const getArticle = await fetch(
    "https://fe-project-cowokers.vercel.app/8-7/articles?pageSize=20",
  );
  const articles = await getArticle.json();
  // console.log(BestArticles);

  async function getArticleTest(formData: FormData) {
    "use server";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const test = formData;
    // console.log({ Test: formData });
  }

  return (
    <main className="mx-auto mt-[60px] flex max-w-[1248px] flex-col gap-y-6 px-4 py-8 tab:gap-y-8 tab:px-6 tab:pt-10 pc:gap-y-10">
      <h1 className="2lg-bold tab:2xl-bold">자유게시판</h1>

      <search>
        <form>
          <Input
            type="search"
            placeholder="(이미지) 검색어를 입력해주세요. [검색 버튼 추가?]"
          />
        </form>
      </search>

      <div className="flex flex-col gap-y-8 tab:gap-y-10">
        <section className="flex flex-col gap-y-6 tab:gap-y-10 pc:gap-y-14">
          <h2 className="lg-bold tab:xl-bold">베스트 게시글</h2>

          <ol className="flex tab:gap-x-4 pc:gap-x-5">
            {BestArticles.list.map((article: any) => (
              <li key={article.id} className="w-full">
                <Link href={`/board/${article.id}`}>
                  <article className="relative flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl bg-primary-light p-4 pt-10 tab:h-56 tab:px-6 tab:pt-12">
                    <div>
                      <header>
                        {/* <BestBadge /> */}

                        {article.image && (
                          <figure className="relative float-right size-16 overflow-hidden rounded-xl tab:size-20">
                            <Image
                              alt="게시글 이미지"
                              src={article.image}
                              fill
                            />
                          </figure>
                        )}

                        <h3>{article.title}</h3>
                      </header>

                      <time>{article.createdAt}</time>
                    </div>

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

                      <figure className="flex items-center">
                        <Like />

                        <figcaption className="xs-normal text-slate-400 tab:md-normal">
                          {article.likeCount}
                        </figcaption>
                      </figure>
                    </footer>
                  </article>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <hr />

        <section className="flex flex-col gap-y-6 tab:gap-y-8">
          <header className="flex justify-between">
            <h2 className="lg-bold tab:xl-bold">게시글</h2>

            <form action={getArticleTest}>
              <label htmlFor="orderBy">
                <select id="orderBy">
                  <option value="recent" selected>
                    최신순
                  </option>
                  <option value="like">인기순</option>
                </select>
              </label>
            </form>
          </header>

          <ol className="grid gap-y-4 tab:gap-y-6 pc:grid-cols-2 pc:gap-x-5">
            {articles.list.map((article: any) => (
              <li key={article.id}>
                <Link href={`/board/${article.id}`}>
                  <article className="flex h-40 w-full flex-col justify-between rounded-xl bg-primary-light p-4 pt-6 tab:h-44 tab:px-8 tab:pb-6">
                    <div>
                      <header>
                        {article.image && (
                          <figure className="relative float-right size-16 overflow-hidden rounded-xl tab:size-20">
                            <Image
                              alt="게시글 이미지"
                              src={article.image}
                              fill
                            />
                          </figure>
                        )}

                        <h3>{article.title}</h3>
                      </header>

                      {/* 모바일 사이즈 일때 위치 */}
                      <p>{article.createdAt}</p>

                      {/* 유저 정보가 맞으면 버거 버튼 띄우기 */}
                    </div>

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

                      <figure className="flex items-center">
                        <Like />

                        <figcaption className="xs-normal text-slate-400 tab:md-normal">
                          {article.likeCount}
                        </figcaption>
                      </figure>
                    </footer>
                  </article>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Link
        className="lg-semibold fixed bottom-8 right-6 flex h-12 w-[104px] items-center justify-center rounded-full bg-button-default text-default-light shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:bg-button-hover active:bg-button-active"
        href="/addboard"
      >
        + 글쓰기
      </Link>
    </main>
  );
}
