Write-Output "Copying vite rollup visulizer stats to build directory..."
Copy-Item -Path "stats.html" -Destination "dist/vite-stats.html" -Force

Write-Output "Copying code coverage report to build directory..."
Copy-Item -Path "coverage" -Destination "dist/coverage" -Recurse -Force

Write-Output "Post-build script completed."