import { AppThemeOptionModel } from "../models/app-theme-option.model"

export const SAMPLE_MESSAGES: MessageModel[] = [
  {
    id: '123',
    content: 'Hello em',
    conversationId: '1'
  },
  {
    id: '124',
    content: 'ABC',
    conversationId: '2'
  },
  {
    id: '121',
    content: 'Alo alo',
    conversationId: '1'
  }
]

export const SAMPLE_CONVERSATIONS: ConversationModel[] = [
  {
    id: '1'
  },
  {
    id: '2'
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
