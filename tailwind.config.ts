import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				status: {
					'in-process': 'hsl(var(--status-in-process))',
					'in-process-foreground': 'hsl(var(--status-in-process-foreground))',
					'need-to-start': 'hsl(var(--status-need-to-start))',
					'need-to-start-foreground': 'hsl(var(--status-need-to-start-foreground))',
					'complete': 'hsl(var(--status-complete))',
					'complete-foreground': 'hsl(var(--status-complete-foreground))',
					'blocked': 'hsl(var(--status-blocked))',
					'blocked-foreground': 'hsl(var(--status-blocked-foreground))'
				},
				priority: {
					'high': 'hsl(var(--priority-high))',
					'high-foreground': 'hsl(var(--priority-high-foreground))',
					'medium': 'hsl(var(--priority-medium))',
					'medium-foreground': 'hsl(var(--priority-medium-foreground))',
					'low': 'hsl(var(--priority-low))',
					'low-foreground': 'hsl(var(--priority-low-foreground))'
				},
				special: {
					'question': 'hsl(var(--question-bg))',
					'question-foreground': 'hsl(var(--question-foreground))',
					'extract': 'hsl(var(--extract-bg))',
					'extract-foreground': 'hsl(var(--extract-foreground))',
					'abc': 'hsl(var(--abc-bg))',
					'abc-foreground': 'hsl(var(--abc-foreground))'
				},
				header: {
					DEFAULT: 'hsl(var(--header-bg))',
					border: 'hsl(var(--header-border))'
				},
				toolbar: {
					DEFAULT: 'hsl(var(--toolbar-bg))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
