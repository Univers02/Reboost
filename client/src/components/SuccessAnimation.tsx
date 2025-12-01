import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const successAnimationData = {
  "v": "5.7.4",
  "fr": 60,
  "ip": 0,
  "op": 90,
  "w": 200,
  "h": 200,
  "nm": "Success Check",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Check",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0, 0], [0, 0], [0, 0]],
                  "o": [[0, 0], [0, 0], [0, 0]],
                  "v": [[-25, 0], [-8, 17], [25, -15]],
                  "c": false
                }
              },
              "nm": "Path 1"
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [1, 1, 1, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 8 },
              "lc": 2,
              "lj": 2,
              "nm": "Stroke 1"
            },
            {
              "ty": "tm",
              "s": { "a": 0, "k": 0 },
              "e": {
                "a": 1,
                "k": [
                  { "t": 30, "s": [0], "e": [100] },
                  { "t": 60, "s": [100] }
                ]
              },
              "o": { "a": 0, "k": 0 },
              "m": 1,
              "nm": "Trim Paths 1"
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Check Mark"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            { "t": 0, "s": [0, 0, 100], "e": [110, 110, 100] },
            { "t": 20, "s": [110, 110, 100], "e": [100, 100, 100] },
            { "t": 30, "s": [100, 100, 100] }
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [120, 120] },
              "p": { "a": 0, "k": [0, 0] },
              "nm": "Ellipse Path 1"
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.216, 0.784, 0.478, 1] },
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "nm": "Fill 1"
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Circle Fill"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "Ring",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "t": 25, "s": [100], "e": [0] },
            { "t": 50, "s": [0] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            { "t": 20, "s": [100, 100, 100], "e": [150, 150, 100] },
            { "t": 50, "s": [150, 150, 100] }
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [120, 120] },
              "p": { "a": 0, "k": [0, 0] },
              "nm": "Ellipse Path 1"
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0.216, 0.784, 0.478, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 6 },
              "lc": 2,
              "lj": 2,
              "nm": "Stroke 1"
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Ring Stroke"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    }
  ]
};

interface SuccessAnimationProps {
  size?: number;
  loop?: boolean;
  className?: string;
}

export default function SuccessAnimation({ 
  size = 150, 
  loop = false,
  className = ""
}: SuccessAnimationProps) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie
        animationData={successAnimationData}
        loop={loop}
        autoplay={true}
        style={{ width: size, height: size }}
        onComplete={() => setIsComplete(true)}
      />
    </div>
  );
}
