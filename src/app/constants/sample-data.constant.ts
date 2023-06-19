import { AppThemeOptionModel } from "../models/app-theme-option.model"

export const SAMPLE_MESSAGES: MessageModel[] = [
  {
    id: '123',
    content: 'Hello em',
    conversationId: 'x-aozpxl312x-x0xa'
  },
  {
    id: '124',
    content: 'ABC',
    conversationId: 'x3xz-smk2sao-xzop'
  },
  {
    id: '121',
    content: 'Alo alo',
    conversationId: 'x-aozpxl312x-x0xa'
  }
]

export const SAMPLE_CONVERSATIONS: ConversationModel[] = [
  {
    id: 'x-aozpxl312x-x0xa'
  },
  {
    id: 'x3xz-smk2sao-xzop'
  }
]

export const SAMPLE_THEMES: AppThemeOptionModel[] = [
  {
    label: 'Dark',
    value: 'dark'
  },
  {
    label: 'Light',
    value: 'light'
  }
]
