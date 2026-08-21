"use client";

import type { BookPageModel, Locale, Reflection } from "@/types";
import { beginningBody, BEGINNING_IMAGE } from "@/content/beginning";
import { chunkContent, getLocalized, padOrder } from "@/lib/book";

interface PageContentProps {
  page: BookPageModel;
  reflection?: Reflection;
  reflections: Reflection[];
  locale: Locale;
  pageLabel?: string;
  onSelectReflection: (id: string) => void;
}

export function PageContent({
  page,
  reflection,
  locale,
  pageLabel,
}: PageContentProps) {
  if (page.role === "beginning-image") {
    return (
      <div className="page-inner page-beginning-image">
        <figure className="page-beginning-image__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BEGINNING_IMAGE}
            alt=""
            className="page-beginning-image__img"
            draggable={false}
          />
        </figure>
        {pageLabel && <p className="page-folio">{pageLabel}</p>}
      </div>
    );
  }

  if (page.role === "beginning") {
    const text = beginningBody[locale] || beginningBody.ca;
    const paragraphs = text
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <div className="page-inner page-beginning">
        <div className="page-beginning__text">
          {paragraphs.map((paragraph, i) => {
            const isSignature = paragraph === "Nina";
            return (
              <p
                key={i}
                className={
                  isSignature
                    ? "page-beginning__paragraph page-beginning__signature"
                    : "page-beginning__paragraph"
                }
              >
                {paragraph.split("\n").map((line, j, lines) => (
                  <span key={j}>
                    {line}
                    {j < lines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  if (page.kind === "blank" || !reflection) {
    return <div className="page-inner page-empty" aria-hidden="true" />;
  }

  const title = getLocalized(reflection.title, locale);
  const fullContent = getLocalized(reflection.content, locale);
  const chunks = chunkContent(fullContent);
  const chunkIndex = page.bodyChunk ?? 0;
  const content = chunks[chunkIndex] ?? "";
  const num = padOrder(reflection.order);

  if (page.role === "title") {
    return (
      <div className={`page-inner page-title-spread page-${reflection.type}`}>
        <div className="page-title-block">
          <p className="page-title-block__num">{num}</p>
          <hr className="page-title-block__rule" />
          <h2 className="page-title-block__title">{title}</h2>
          {reflection.image && (
            <figure className="page-title-block__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reflection.image}
                alt=""
                className="page-title-block__image"
                draggable={false}
              />
            </figure>
          )}
        </div>
      </div>
    );
  }

  if (page.role === "quote") {
    return (
      <div className="page-inner page-quote">
        <p className="page-quote__text">{title}</p>
      </div>
    );
  }

  const typeClass =
    reflection.type === "handwritten"
      ? "page-hand"
      : reflection.type === "short" || reflection.type === "fragment"
        ? "page-fragment"
        : reflection.type === "letter"
          ? "page-letter"
          : "";

  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`page-inner page-body-spread ${typeClass}`.trim()}>
      <span className="page-margin-mark" aria-hidden="true">
        Arxiu
      </span>
      <div className="page-body">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, i) => (
            <p key={i} className="page-body__text">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="page-body__text page-body__text--empty" aria-hidden="true" />
        )}
      </div>
      {pageLabel && <p className="page-folio">{pageLabel}</p>}
    </div>
  );
}
