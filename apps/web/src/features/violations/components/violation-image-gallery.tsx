"use client";

import { useState } from "react";
import { AspectRatio, Skeleton } from "@mantine/core";
import { EmptyState } from "@/components/feedback/empty-state";
import { cn } from "@/lib/cn";
import { violationImagesEmptyState } from "../constants";

type ViolationImageGalleryProps = {
  imageUrls: string[];
};

export function ViolationImageGallery({ imageUrls }: ViolationImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <EmptyState
        title={violationImagesEmptyState.title}
        description={violationImagesEmptyState.description}
        className="min-h-[240px]"
      />
    );
  }

  const safeIndex = Math.min(activeIndex, imageUrls.length - 1);
  const activeImage = imageUrls[safeIndex]!;

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
      <EvidenceImage src={activeImage} alt={`Evidence ${safeIndex + 1}`} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {imageUrls.map((url, index) => (
          <button
            key={`${url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "rounded-lg ring-offset-2 transition",
              index === safeIndex ? "ring-2 ring-zinc-900" : "ring-1 ring-zinc-200",
            )}
            aria-label={`View evidence image ${index + 1}`}
          >
            <EvidenceThumbnail src={url} alt={`Evidence thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

type EvidenceImageProps = {
  src: string;
  alt: string;
};

function EvidenceImage({ src, alt }: EvidenceImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <AspectRatio ratio={16 / 9}>
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-100">
        {!loaded && !error ? <Skeleton className="absolute inset-0" /> : null}
        {error ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            Image unavailable
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-200",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>
    </AspectRatio>
  );
}

type EvidenceThumbnailProps = {
  src: string;
  alt: string;
};

function EvidenceThumbnail({ src, alt }: EvidenceThumbnailProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <AspectRatio ratio={1}>
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-100">
        {!loaded && !error ? <Skeleton className="absolute inset-0" /> : null}
        {error ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
            Unavailable
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-200",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>
    </AspectRatio>
  );
}
