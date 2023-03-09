import { z } from 'zod';
import { type Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','type','provider','providerAccountId','refresh_token','access_token','id_token','token_type','scope','session_state','expires_at','createdAt','updatedAt','userId']);

export const NoteScalarFieldEnumSchema = z.enum(['id','title','markdown','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TagScalarFieldEnumSchema = z.enum(['id','label','createdAt','updatedAt']);

export const TagsOnNotesScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','tagId','noteId']);

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string(),
  label: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  markdown: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Note = z.infer<typeof NoteSchema>

/////////////////////////////////////////
// TAGS ON NOTES SCHEMA
/////////////////////////////////////////

export const TagsOnNotesSchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tagId: z.string(),
  noteId: z.string(),
})

export type TagsOnNotes = z.infer<typeof TagsOnNotesSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  id_token: z.string().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  session_state: z.string().nullable(),
  expires_at: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>
