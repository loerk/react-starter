import React, { useEffect, useState } from "react";

const weatherKey = '639d9251f29344c48515467b1b904768'
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`

