'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import * as Progress from '@radix-ui/react-progress';

interface LoyaltyCardProps {
    userId: string;
    currentDrinks: number;
    drinksForReward: number;
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({
    userId,
    currentDrinks,
    drinksForReward,
}) => {
    const actualDrinks = currentDrinks % drinksForReward;
    const progress = Math.min(100, Math.max(0, (actualDrinks / drinksForReward) * 100));
    const showFreeDrinkClaim = actualDrinks >= drinksForReward;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* QR Code Section */}
            <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-4 rounded-lg">
                    <QRCode
                        value={userId}
                        size={200}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">Tu código de fidelidad personal</p>
            </div>

            {/* Progress Section */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">Progreso hacia bebida gratis</span>
                    <span className="text-gray-500">{currentDrinks % drinksForReward}/{drinksForReward} bebidas</span>
                </div>
                <Progress.Root
                    className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200"
                    value={progress}
                >
                    <Progress.Indicator
                        className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
                        style={{ transform: `translateX(-${100 - progress}%)` }}
                    />
                </Progress.Root>
                {showFreeDrinkClaim && (
                    <div className="text-center text-green-600 font-medium mt-2">
                        ¡Felicidades! ¡Has ganado una bebida gratis!
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoyaltyCard; 