@echo off
title Deploy Kunal Portfolio to Vercel
cd /d "c:\Users\hqsav\OneDrive\Desktop\kunalportfolio"
echo ========================================================
echo   KUNAL KUSHWAHA PORTFOLIO - VERCEL DEPLOYMENT
echo ========================================================
echo.
echo Starting Vercel deployment...
echo (Agar browser open ho to login confirm kar dijiye)
echo.
npx -y vercel --prod
echo.
echo ========================================================
echo Deployment process complete!
echo ========================================================
pause
