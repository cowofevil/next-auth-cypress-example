import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const NoteScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.NoteScalarFieldEnum);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TagScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.TagScalarFieldEnum);

export const TagsOnNotesScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.TagsOnNotesScalarFieldEnum);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

export const VerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VerificationTokenScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// TAG
//------------------------------------------------------

export const TagSchema = z.object({
  id: z.string(),
  label: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// NOTE
//------------------------------------------------------

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  markdown: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TAGS ON NOTES
//------------------------------------------------------

export const TagsOnNotesSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  tagId: z.string(),
  noteId: z.string(),
});

// ACCOUNT
//------------------------------------------------------

export const AccountSchema = z.object({
  id: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  id_token: z.string().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  session_state: z.string().nullish(),
  expires_at: z.number().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});
