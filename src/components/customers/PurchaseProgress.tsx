'use client'

interface PurchaseProgressProps {
    totalPurchases: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export function PurchaseProgress({
    totalPurchases,
    size = 'md',
    showLabel = true
}: PurchaseProgressProps) {
    const progress = totalPurchases % 10 || 0;
    const percentage = (progress * 100) / 10;

    // Tamaños predefinidos
    const sizes = {
        sm: { width: 60, stroke: 4 },
        md: { width: 80, stroke: 6 },
        lg: { width: 100, stroke: 8 },
    };

    const { width, stroke } = sizes[size];
    const radius = (width - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={width}
                height={width}
            >
                {/* Círculo de fondo */}
                <circle
                    className="text-gray-200"
                    strokeWidth={stroke}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={width / 2}
                    cy={width / 2}
                />
                {/* Círculo de progreso */}
                <circle
                    className="text-brand-500 transition-all duration-300 ease-in-out"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={width / 2}
                    cy={width / 2}
                />
            </svg>
            {showLabel && (
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                        {progress}/10
                    </span>
                    {size === 'lg' && (
                        <span className="text-xs text-gray-500">
                            Total: {totalPurchases}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}