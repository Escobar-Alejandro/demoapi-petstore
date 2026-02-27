export const DEFAULT_TIMEOUT = 20 * 1000;
export const SHORT_TIMEOUT = 5 * 1000;
export const LONG_TIMEOUT = 60 * 1000;

export const TIMEOUTS = {
    Default: DEFAULT_TIMEOUT,
    Short: SHORT_TIMEOUT,
    Long: LONG_TIMEOUT
} as const;

export type ITimeoutOptions = typeof TIMEOUTS[keyof typeof TIMEOUTS];