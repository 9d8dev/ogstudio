"use client";
import { Suspense, type ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useImagesStore } from "../../stores/imagesStore";
import { useZoomStore } from "../../stores/zoomStore";
import { useUser } from "../../lib/hooks/useUser";

interface OgSplashProps {
  children: ReactNode;
}

function SplashInner({ children }: OgSplashProps) {
  const searchParams = useSearchParams();
  const image = searchParams.get("i");
  const { data } = useUser();

  useEffect(() => {
    void useImagesStore.persist.rehydrate();
    void useZoomStore.persist.rehydrate();
  }, []);

  return (
    <>
      <OgEditor height={630} imageId={image ?? "splash"} width={1200} />
      {image ? null : (
        <Flex
          align="center"
          className="z-10"
          height="100vh"
          justify="center"
          left="0"
          position="absolute"
          style={{ backgroundColor: "var(--color-overlay)" }}
          top="0"
          width="100vw"
        >
          <Box
            p="6"
            style={{
              boxShadow: "var(--shadow-6)",
              backgroundColor: "var(--color-panel-solid)",
              borderRadius: "var(--radius-5)",
            }}
            width="980px"
          >
            <Flex align="center" justify="between">
              <Flex align="center" className="-mt-2" gap="6">
                <Text asChild size="6">
                  <Link className="flex gap-2 items-center" href="/">
                    <Image
                      alt="OG Studio logo"
                      height={50}
                      src="/icon.png"
                      width={50}
                    />
                    Studio
                  </Link>
                </Text>
                <Badge color="orange" radius="full" size="2">
                  Early preview
                </Badge>
                <Button asChild color="gray" radius="full" variant="ghost">
                  <Link
                    href="https://github.com/QuiiBz/ogstudio"
                    target="_blank"
                  >
                    <GitHubIcon />
                    GitHub
                  </Link>
                </Button>
              </Flex>
              <Flex align="center" justify="between" mx="2">
                <Button asChild color="gray" radius="full" variant="ghost">
                  <Link href={data?.user ? "/profile" : "/login"}>
                    {data?.user?.name ?? "Guest"}
                    <Avatar
                      fallback="G"
                      radius="full"
                      size="1"
                      src={data?.user?.avatar}
                    />
                  </Link>
                </Button>
              </Flex>
            </Flex>
            <Text as="p" className="w-2/3" size="2">
              Create static or dynamic Open Graph images with an intuitive,
              Figma-like visual editor. Browse ready-to-use templates, and
              export your images to SVG/PNG or to a dynamic URL.
            </Text>
            <Separator className="opacity-50" my="6" size="4" />
            {children}
          </Box>
        </Flex>
      )}
    </>
  );
}

export function Splash({ children }: OgSplashProps) {
  return (
    // SplashInner uses `useSearchParams()` so we need to wrap it in a Suspense to allow to statically render the page
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <SplashInner>{children}</SplashInner>
    </Suspense>
  );
}
