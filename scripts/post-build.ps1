Write-Output "Copying vite rollup visulizer stats to docs directory..."
Copy-Item -Path "stats.html" -Destination "docs/vite-stats.html" -Force

Write-Output "Copying code coverage report to docs directory..."
Copy-Item -Path "coverage" -Destination "docs/coverage" -Recurse -Force

Write-Output "Post-build script completed."